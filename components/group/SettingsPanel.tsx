"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";

/** UI-only settings — persists nothing yet; binds to Supabase profiles once auth ships. */

const notificationPrefs = [
  { id: "letters", label: "Founder's letters", detail: "A few times a year, when there is something to say." },
  { id: "allocations", label: "Allocations & numbered runs", detail: "First access windows before public release." },
  { id: "events", label: "Estate events", detail: "Invitations and waitlist movements." },
  { id: "reports", label: "IR publications", detail: "Reports and notes as they enter the vault." },
];

function Toggle({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={[
        "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300",
        enabled ? "border-gold bg-gold/80" : "border-white/20 bg-white/5",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all duration-300",
          enabled ? "left-[22px] bg-background" : "left-0.5 bg-white/50",
        ].join(" ")}
      />
    </button>
  );
}

export default function SettingsPanel() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    letters: true,
    allocations: true,
    events: true,
    reports: false,
  });
  const [saved, setSaved] = useState(false);

  const onSave = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={onSave} className="space-y-8">
      {/* Identity */}
      <section className="rounded-lg glass p-8 sm:p-10">
        <p className="overline-label text-white/45">Identity</p>
        <div className="mt-7 grid gap-7 sm:grid-cols-2">
          <Field label="Display Name" htmlFor="set-name">
            <Input id="set-name" name="name" defaultValue="Guest" autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="set-email">
            <Input id="set-email" name="email" type="email" placeholder="your@email.com" autoComplete="email" />
          </Field>
          <Field label="Preferred Language" htmlFor="set-lang">
            <Select id="set-lang" defaultValue="English">
              {["English", "Français", "Português", "Deutsch"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </Select>
          </Field>
          <Field label="Time Zone" htmlFor="set-tz">
            <Select id="set-tz" defaultValue="GMT — London">
              {["GMT — London", "GMT — Accra", "WET — Porto", "CET — The Estate", "EST — New York"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
        </div>
      </section>

      {/* Correspondence */}
      <section className="rounded-lg glass p-8 sm:p-10">
        <p className="overline-label text-white/45">Correspondence</p>
        <ul className="mt-4 divide-y divide-white/6">
          {notificationPrefs.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-6 py-5">
              <div>
                <p className="text-sm text-white">{n.label}</p>
                <p className="mt-0.5 text-xs text-white/40">{n.detail}</p>
              </div>
              <Toggle
                enabled={prefs[n.id]}
                label={n.label}
                onToggle={() => setPrefs((p) => ({ ...p, [n.id]: !p[n.id] }))}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Security */}
      <section className="rounded-lg glass p-8 sm:p-10">
        <p className="overline-label text-white/45">Security</p>
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/8 p-5">
            <div>
              <p className="text-sm text-white">Password</p>
              <p className="mt-0.5 text-xs text-white/40">Managed by group sign-in once accounts launch.</p>
            </div>
            <Button variant="secondary" size="sm" disabled>
              Change
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/8 p-5">
            <div>
              <p className="text-sm text-white">Two-Factor Authentication</p>
              <p className="mt-0.5 text-xs text-white/40">Required for vault partner tier.</p>
            </div>
            <Button variant="secondary" size="sm" disabled>
              Enable
            </Button>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-5">
        <Button type="submit">Save Preferences</Button>
        <span
          aria-live="polite"
          className={`text-sm text-success transition-opacity duration-300 ${saved ? "opacity-100" : "opacity-0"}`}
        >
          Preferences noted.
        </span>
      </div>
    </form>
  );
}
