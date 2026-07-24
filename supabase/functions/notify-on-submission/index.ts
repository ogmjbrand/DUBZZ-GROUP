import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

// Payload shape sent by Supabase Database Webhooks (Database -> Webhooks in
// the dashboard) configured on INSERT for: inquiries, contact_messages,
// job_applications, media_bookings. See docs/BACKEND_SETUP.md for how to wire
// the webhook itself -- that part isn't something a migration can automate.
interface DbWebhookPayload {
  type: "INSERT";
  table: string;
  schema: string;
  record: Record<string, unknown>;
}

const SUBJECTS: Record<string, (r: Record<string, unknown>) => string> = {
  inquiries: (r) => `New Dubzz Trade inquiry from ${r.company_name}`,
  contact_messages: (r) => `New contact message: ${r.subject ?? "(no subject)"}`,
  job_applications: (r) => `New job application from ${r.name}`,
  media_bookings: (r) => `New Dubzz Media booking request from ${r.name}`,
};

function renderBody(table: string, record: Record<string, unknown>): string {
  const rows = Object.entries(record)
    .map(([k, v]) => `<tr><td style="padding:4px 12px;color:#A1A1AA">${k}</td><td style="padding:4px 12px">${String(v ?? "")}</td></tr>`)
    .join("");
  return `<h2>${table}</h2><table>${rows}</table>`;
}

export default {
  // Server-to-server only: the DB webhook must send the project's secret key
  // as the apikey header, never expose this URL/mode to the browser.
  fetch: withSupabase({ auth: "secret" }, async (req) => {
    const payload: DbWebhookPayload = await req.json();
    const subjectFn = SUBJECTS[payload.table];

    if (!subjectFn) {
      return Response.json({ message: `Ignoring unrecognized table: ${payload.table}` }, { status: 200 });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notifyTo = Deno.env.get("NOTIFY_EMAIL_TO");

    if (!resendKey || !notifyTo) {
      console.error("Missing RESEND_API_KEY or NOTIFY_EMAIL_TO secret");
      return Response.json({ message: "Notification not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dubzz Group <notifications@dubzzgroup.com>",
        to: notifyTo,
        subject: subjectFn(payload.record),
        html: renderBody(payload.table, payload.record),
      }),
    });

    if (!res.ok) {
      console.error("Resend API error", await res.text());
      return Response.json({ message: "Failed to send notification email" }, { status: 502 });
    }

    return Response.json({ message: "Notification sent" }, { status: 200 });
  }),
};

/* Setup (one-time, per environment):

  1. supabase secrets set RESEND_API_KEY=re_... NOTIFY_EMAIL_TO=team@dubzzgroup.com
  2. supabase functions deploy notify-on-submission
  3. In the Supabase dashboard: Database -> Webhooks -> create one webhook per
     table (inquiries, contact_messages, job_applications, media_bookings),
     event = INSERT, target = this function's URL, and set the request header
     `apikey: <the project's secret key>` so `auth: "secret"` above accepts it.

  To invoke locally for testing:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/notify-on-submission' \
    --header 'apiKey: <secret key>' \
    --data '{"type":"INSERT","table":"contact_messages","schema":"public","record":{"name":"Test","email":"test@example.com","message":"Hi"}}'

*/
