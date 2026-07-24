"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { jobs, type Job } from "@/lib/data/jobs";

type Status = "idle" | "done";

/**
 * Role list + application form. The submit handler is UI-only for now —
 * POST /api/careers/applications expects a job_posting_id from the database,
 * so wiring happens once job postings are seeded. Handler is isolated below.
 */
async function submitApplication(payload: {
  jobId: string;
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter: string;
}) {
  // TODO(backend): swap for fetch('/api/careers/applications') once job
  // postings exist in Supabase and expose their UUIDs to the frontend.
  void payload;
  await new Promise((r) => setTimeout(r, 400));
}

export default function CareersBoard() {
  const [selected, setSelected] = useState<Job | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;
    const data = new FormData(e.currentTarget);
    await submitApplication({
      jobId: selected.id,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      resumeUrl: String(data.get("resume") ?? ""),
      coverLetter: String(data.get("cover") ?? ""),
    });
    setStatus("done");
  };

  if (status === "done" && selected) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-10 text-center">
        <p className="font-display text-3xl text-white">Application received.</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral">
          Thank you for applying for <span className="text-white">{selected.title}</span>.
          If the standard fits, you&apos;ll hear from us within two weeks.
        </p>
        <div className="mt-8">
          <Button
            variant="secondary"
            onClick={() => {
              setSelected(null);
              setStatus("idle");
            }}
          >
            Back to Open Roles
          </Button>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="overline-label text-[10px] text-white/40 transition-colors hover:text-gold"
          >
            ← All roles
          </button>
          <h2 className="mt-6 font-display text-4xl text-white">{selected.title}</h2>
          <p className="mt-3 text-sm text-gold">{selected.division}</p>
          <p className="mt-6 text-sm leading-relaxed text-neutral">{selected.summary}</p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/8 pb-3">
              <dt className="text-white/40">Location</dt>
              <dd className="text-white">{selected.location}</dd>
            </div>
            <div className="flex justify-between border-b border-white/8 pb-3">
              <dt className="text-white/40">Type</dt>
              <dd className="text-white">{selected.type}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} className="space-y-7 rounded-lg glass p-8 sm:p-10">
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Full Name" htmlFor="apply-name">
                <Input id="apply-name" name="name" required autoComplete="name" placeholder="Your name" />
              </Field>
              <Field label="Email" htmlFor="apply-email">
                <Input id="apply-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
              </Field>
            </div>
            <Field label="Portfolio / Résumé URL" htmlFor="apply-resume">
              <Input id="apply-resume" name="resume" type="url" required placeholder="https://…" />
            </Field>
            <Field label="Why you, why this house" htmlFor="apply-cover">
              <Textarea id="apply-cover" name="cover" required rows={6} placeholder="Short and honest beats long and polished." />
            </Field>
            <Button type="submit">Submit Application</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id}>
          <button
            type="button"
            onClick={() => setSelected(job)}
            className="group flex w-full flex-col gap-4 p-8 text-left sm:flex-row sm:items-center sm:gap-8"
          >
            <span className="flex-1">
              <span className="block font-display text-2xl text-white transition-colors group-hover:text-gold-bright">
                {job.title}
              </span>
              <span className="mt-2 block text-sm text-neutral">{job.summary}</span>
            </span>
            <span className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1.5">
              <span className="overline-label text-[9px] text-gold">{job.division}</span>
              <span className="text-xs text-white/40">
                {job.location} · {job.type}
              </span>
            </span>
            <svg width="20" height="14" viewBox="0 0 22 16" fill="none" aria-hidden className="hidden shrink-0 -translate-x-2 text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-gold group-hover:opacity-100 sm:block">
              <path d="M14 1l7 7-7 7M21 8H1" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </Card>
      ))}
    </div>
  );
}
