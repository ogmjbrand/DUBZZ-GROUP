"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { divisions } from "@/lib/data/divisions";

type Status = "idle" | "sending" | "done" | "error";

async function submitContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  division: string;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? "Something went wrong");
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      await submitContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
        division: String(data.get("division") ?? ""),
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
      <div className="rounded-lg border border-success/30 bg-success/10 p-8">
        <p className="font-display text-2xl text-white">Message received.</p>
        <p className="mt-3 text-sm leading-relaxed text-neutral">
          Thank you — someone from the right house will reply within two
          business days. For urgent matters, write to{" "}
          <a href="mailto:hello@dubzzgroup.com" className="text-gold hover:text-gold-bright">
            hello@dubzzgroup.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="contact-name">
          <Input id="contact-name" name="name" required autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <Input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
        </Field>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Division" htmlFor="contact-division">
          <Select id="contact-division" name="division" defaultValue="group">
            {divisions.map((d) => (
              <option key={d.key} value={d.key}>
                {d.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Subject" htmlFor="contact-subject">
          <Input id="contact-subject" name="subject" placeholder="What is this regarding?" />
        </Field>
      </div>
      <Field label="Message" htmlFor="contact-message">
        <Textarea id="contact-message" name="message" required placeholder="Tell us what you're building…" rows={6} />
      </Field>

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
