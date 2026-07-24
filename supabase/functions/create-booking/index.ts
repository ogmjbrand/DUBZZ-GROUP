import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

interface CreateBookingBody {
  sanctuary_id: string;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  guests: number;
  experience_ids?: { experience_id: string; quantity?: number }[];
}

export default {
  fetch: withSupabase({ auth: "user" }, async (req, ctx) => {
    const body: CreateBookingBody = await req.json();

    const { data, error } = await ctx.supabase.rpc("create_booking", {
      p_sanctuary_id: body.sanctuary_id,
      p_check_in: body.check_in,
      p_check_out: body.check_out,
      p_guests: body.guests,
      p_experience_ids: body.experience_ids ?? [],
    });

    if (error) {
      // 23P01 = exclusion_violation -> the requested dates overlap an existing booking
      const status = error.code === "23P01" ? 409 : 400;
      const message = error.code === "23P01"
        ? "This sanctuary is not available for the selected dates."
        : error.message;
      return Response.json({ message }, { status });
    }

    return Response.json({ booking: data }, { status: 201 });
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Sign in a user and pass their access token as the Authorization bearer:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-booking' \
    --header 'apiKey: <publishable key>' \
    --header 'Authorization: Bearer <user access token>' \
    --data '{"sanctuary_id":"...","check_in":"2026-08-01","check_out":"2026-08-05","guests":2}'

*/
