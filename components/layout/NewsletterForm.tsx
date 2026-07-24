"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "done";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // UI-only for now — swap for a fetch('/api/newsletter') when the endpoint lands.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("done");
  };

  if (status === "done") {
    return (
      <p className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
        Welcome to the inner circle. Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm items-end gap-3">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/25 transition-colors focus:border-gold focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-gold px-5 py-2.5 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-gold-bright"
      >
        Join
      </button>
    </form>
  );
}
