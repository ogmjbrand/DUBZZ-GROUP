"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { commodities } from "@/lib/data/trade";

type Status = "idle" | "sending" | "done" | "error";

async function submitInquiry(payload: {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const res = await fetch("/api/trade/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? "Something went wrong");
  }
}

export default function TradeInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const commodity = String(data.get("commodity") ?? "");
    const volume = String(data.get("volume") ?? "");
    const destination = String(data.get("destination") ?? "");
    const brief = String(data.get("message") ?? "");
    setStatus("sending");
    setError("");
    try {
      await submitInquiry({
        company_name: String(data.get("company") ?? ""),
        contact_name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        // The desk reads one message field — fold the structured bits in.
        message: [
          commodity ? `Commodity: ${commodity}` : "",
          volume ? `Volume: ${volume}` : "",
          destination ? `Destination: ${destination}` : "",
          "",
          brief,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-10">
        <p className="font-display text-3xl text-white">Inquiry received.</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral">
          The trade desk responds within one business day with availability,
          specification sheets, and an indicative position.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Company" htmlFor="ti-company">
          <Input id="ti-company" name="company" required autoComplete="organization" placeholder="Company name" />
        </Field>
        <Field label="Contact Name" htmlFor="ti-name">
          <Input id="ti-name" name="name" required autoComplete="name" placeholder="Full name" />
        </Field>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Email" htmlFor="ti-email">
          <Input id="ti-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </Field>
        <Field label="Phone (optional)" htmlFor="ti-phone">
          <Input id="ti-phone" name="phone" type="tel" autoComplete="tel" placeholder="+44…" />
        </Field>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        <Field label="Commodity" htmlFor="ti-commodity">
          <Select id="ti-commodity" name="commodity" defaultValue={commodities[0].name}>
            {commodities.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Other">Other / multiple</option>
          </Select>
        </Field>
        <Field label="Indicative Volume" htmlFor="ti-volume">
          <Input id="ti-volume" name="volume" placeholder="e.g. 250MT / quarter" />
        </Field>
        <Field label="Destination" htmlFor="ti-destination">
          <Input id="ti-destination" name="destination" placeholder="Port or market" />
        </Field>
      </div>
      <Field label="The Brief" htmlFor="ti-message">
        <Textarea
          id="ti-message"
          name="message"
          required
          rows={5}
          placeholder="Specification, timeline, and anything the desk should know."
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Submit to the Trade Desk"}
      </Button>
    </form>
  );
}
