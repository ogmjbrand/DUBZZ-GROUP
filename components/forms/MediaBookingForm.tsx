"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";

type Status = "idle" | "sending" | "done" | "error";

const projectTypes = [
  "Brand & Identity",
  "Film & Campaign",
  "Digital & Experience",
  "Strategy",
  "Not sure yet",
];

async function submitBooking(payload: {
  name: string;
  email: string;
  company: string;
  project_type: string;
  message: string;
  preferred_date: string;
}) {
  const res = await fetch("/api/media/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      preferred_date: payload.preferred_date || null,
    }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? "Something went wrong");
  }
}

export default function MediaBookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      await submitBooking({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? ""),
        project_type: String(data.get("project_type") ?? ""),
        message: String(data.get("message") ?? ""),
        preferred_date: String(data.get("preferred_date") ?? ""),
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
        <p className="font-display text-3xl text-white">Commission request received.</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral">
          The studio reviews new commissions every Friday. If the fit is right,
          you&apos;ll get a call — not a form email — within the week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Your Name" htmlFor="booking-name">
          <Input id="booking-name" name="name" required autoComplete="name" placeholder="Full name" />
        </Field>
        <Field label="Email" htmlFor="booking-email">
          <Input id="booking-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
        </Field>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Company" htmlFor="booking-company">
          <Input id="booking-company" name="company" placeholder="Company or brand" />
        </Field>
        <Field label="Project Type" htmlFor="booking-type">
          <Select id="booking-type" name="project_type" defaultValue={projectTypes[0]}>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Preferred Start (optional)" htmlFor="booking-date">
        <Input id="booking-date" name="preferred_date" type="date" />
      </Field>
      <Field label="The Brief" htmlFor="booking-message">
        <Textarea
          id="booking-message"
          name="message"
          rows={6}
          placeholder="What are you making, who is it for, and what does success look like?"
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Request the Commission"}
      </Button>
    </form>
  );
}
