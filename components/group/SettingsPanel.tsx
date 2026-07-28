"use client";

import { useEffect, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { useAuth } from "@/components/providers/AuthProvider";
import { createClient } from "@/lib/supabase/client";

const notificationPrefs = [
  { id: "letters", label: "Founder's letters", detail: "A few times a year, when there is something to say." },
  { id: "allocations", label: "Allocations & numbered runs", detail: "First access windows before public release." },
  { id: "events", label: "Estate events", detail: "Invitations and waitlist movements." },
  { id: "reports", label: "IR publications", detail: "Reports and notes as they enter the vault." },
];

const PREFS_KEY = "dubzz-correspondence-prefs-v1";

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
  const { user, profile, refreshProfile } = useAuth();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    letters: true,
    allocations: true,
    events: true,
    reports: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [pwOpen, setPwOpen] = useState(false);
  const [pwStatus, setPwStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) setPrefs((p) => ({ ...p, ...JSON.parse(raw) }));
    } catch {
      // corrupted storage -- keep defaults
    }
  }, []);

  const togglePref = (id: string) => {
    setPrefs((p) => {
      const next = { ...p, [id]: !p[id] };
      localStorage.setItem(PREFS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    setSaving(true);
    setError("");
    const supabase = createClient();

    const updates: Promise<{ error: { message: string } | null }>[] = [];
    if (fullName !== (profile?.full_name ?? "")) {
      updates.push(supabase.from("profiles").update({ full_name: fullName }).eq("id", user.id));
    }
    if (email && email !== user.email) {
      updates.push(supabase.auth.updateUser({ email }));
    }

    const results = await Promise.all(updates);
    const failed = results.find((r) => r.error);
    setSaving(false);

    if (failed?.error) {
      setError(failed.error.message);
      return;
    }

    await refreshProfile();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const onChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = String(data.get("newPassword") ?? "");
    const confirm = String(data.get("confirmPassword") ?? "");

    if (password.length < 6) {
      setPwStatus("error");
      setPwError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setPwStatus("error");
      setPwError("Passwords don't match.");
      return;
    }

    setPwStatus("saving");
    setPwError("");
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setPwStatus("error");
      setPwError(updateError.message);
      return;
    }
    setPwStatus("done");
    (e.currentTarget as HTMLFormElement).reset();
    window.setTimeout(() => {
      setPwStatus("idle");
      setPwOpen(false);
    }, 2000);
  };

  return (
    <form onSubmit={onSave} className="space-y-8">
      {/* Identity */}
      <section className="rounded-lg glass p-8 sm:p-10">
        <p className="overline-label text-white/45">Identity</p>
        <div className="mt-7 grid gap-7 sm:grid-cols-2">
          <Field label="Display Name" htmlFor="set-name">
            <Input id="set-name" name="name" defaultValue={profile?.full_name ?? ""} autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="set-email">
            <Input id="set-email" name="email" type="email" defaultValue={user?.email ?? ""} autoComplete="email" />
          </Field>
          <Field label="Preferred Language" htmlFor="set-lang">
            <Select id="set-lang" defaultValue="English">
              {["English", "Français", "Português", "Deutsch"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </Select>
          </Field>
          <Field label="Time Zone" htmlFor="set-tz">
            <Select id="set-tz" defaultValue="WAT — Lagos">
              {["WAT — Lagos", "WAT — Abuja", "GMT — London", "EST — New York"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
        </div>
        {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}
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
              <Toggle enabled={prefs[n.id]} label={n.label} onToggle={() => togglePref(n.id)} />
            </li>
          ))}
        </ul>
      </section>

      {/* Security */}
      <section className="rounded-lg glass p-8 sm:p-10">
        <p className="overline-label text-white/45">Security</p>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-white/8 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white">Password</p>
                <p className="mt-0.5 text-xs text-white/40">
                  {pwStatus === "done" ? "Password updated." : "Change your account password."}
                </p>
              </div>
              <Button type="button" variant="secondary" size="sm" onClick={() => setPwOpen((v) => !v)}>
                {pwOpen ? "Cancel" : "Change"}
              </Button>
            </div>
            {pwOpen ? (
              <form onSubmit={onChangePassword} className="mt-6 space-y-5 border-t border-white/8 pt-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="New Password" htmlFor="pw-new">
                    <Input id="pw-new" name="newPassword" type="password" required minLength={6} autoComplete="new-password" />
                  </Field>
                  <Field label="Confirm New Password" htmlFor="pw-confirm">
                    <Input id="pw-confirm" name="confirmPassword" type="password" required minLength={6} autoComplete="new-password" />
                  </Field>
                </div>
                {pwStatus === "error" ? <p className="text-sm text-error">{pwError}</p> : null}
                <Button type="submit" size="sm" disabled={pwStatus === "saving"}>
                  {pwStatus === "saving" ? "Updating…" : "Update Password"}
                </Button>
              </form>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/8 p-5">
            <div>
              <p className="text-sm text-white">Two-Factor Authentication</p>
              <p className="mt-0.5 text-xs text-white/40">Not yet available.</p>
            </div>
            <Button variant="secondary" size="sm" disabled>
              Enable
            </Button>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-5">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save Preferences"}
        </Button>
        <span
          aria-live="polite"
          className={`text-sm text-success transition-opacity duration-300 ${saved ? "opacity-100" : "opacity-0"}`}
        >
          Preferences saved.
        </span>
      </div>
    </form>
  );
}
