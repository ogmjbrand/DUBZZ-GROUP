"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { Field, Input, Select } from "@/components/ui/Field";
import { sanctuaries, experiences } from "@/lib/data/resort";
import { useAuth } from "@/components/providers/AuthProvider";

const BOOKING_KEY = "dubzz-booking-v1";
const REVIEW_PATH = "/wine-resort/booking/review";

interface BookingDraft {
  sanctuary?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  experiences?: string[];
}

function readDraft(): BookingDraft {
  try {
    return JSON.parse(sessionStorage.getItem(BOOKING_KEY) ?? "{}") as BookingDraft;
  } catch {
    return {};
  }
}

function writeDraft(patch: Partial<BookingDraft>) {
  sessionStorage.setItem(BOOKING_KEY, JSON.stringify({ ...readDraft(), ...patch }));
}

async function confirmBooking(draft: BookingDraft) {
  const res = await fetch("/api/wine-resort/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sanctuary_slug: draft.sanctuary,
      check_in: draft.checkIn,
      check_out: draft.checkOut,
      guests: draft.guests ?? 2,
      experience_slugs: draft.experiences ?? [],
    }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? "Something went wrong");
  }
}

const steps = [
  { label: "Sanctuary", href: "/wine-resort/booking/sanctuary" },
  { label: "Experience", href: "/wine-resort/booking/experience" },
  { label: "Review", href: "/wine-resort/booking/review" },
];

export function BookingShell({ step, children }: { step: 0 | 1 | 2; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-28 pt-36 sm:px-10">
      <p className="overline-label text-wine">Wine Resort · Booking</p>
      <nav aria-label="Booking progress" className="mb-12 mt-8">
        <ol className="flex items-center gap-2 sm:gap-4">
          {steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={s.label} className="flex flex-1 items-center gap-2 sm:gap-4">
                {state === "done" ? (
                  <Link href={s.href} className="group flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-wine font-label text-[10px] font-bold text-white">
                      ✓
                    </span>
                    <span className="hidden font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 group-hover:text-wine sm:block">
                      {s.label}
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-3" aria-current={state === "current" ? "step" : undefined}>
                    <span
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full border font-label text-[10px] font-bold",
                        state === "current"
                          ? "border-wine text-wine shadow-[0_0_16px_rgba(212,175,55,0.4)]"
                          : "border-white/15 text-white/30",
                      ].join(" ")}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={[
                        "hidden font-label text-[10px] font-semibold uppercase tracking-[0.2em] sm:block",
                        state === "current" ? "text-white" : "text-white/30",
                      ].join(" ")}
                    >
                      {s.label}
                    </span>
                  </span>
                )}
                {i < steps.length - 1 ? (
                  <span aria-hidden className={`h-px flex-1 ${i < step ? "bg-wine/60" : "bg-white/10"}`} />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
      {children}
    </div>
  );
}

export function SanctuaryStep() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState("");

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const d = readDraft();
      if (d.sanctuary) setSelected(d.sanctuary);
      if (d.checkIn) setCheckIn(d.checkIn);
      if (d.checkOut) setCheckOut(d.checkOut);
      if (d.guests) setGuests(d.guests);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const onContinue = () => {
    if (!selected) return setError("Choose a sanctuary to continue.");
    if (!checkIn || !checkOut) return setError("Select your arrival and departure dates.");
    if (new Date(checkOut) <= new Date(checkIn))
      return setError("Departure must be after arrival.");
    setError("");
    writeDraft({ sanctuary: selected, checkIn, checkOut, guests });
    router.push("/wine-resort/booking/experience");
  };

  return (
    <div>
      <h1 className="font-display text-4xl text-white sm:text-5xl">Select your sanctuary.</h1>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {sanctuaries.map((s) => {
          const active = selected === s.slug;
          return (
            <button
              key={s.slug}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setSelected(s.slug);
                setError("");
              }}
              className={[
                "group overflow-hidden rounded-lg border text-left transition-all duration-300",
                active
                  ? "border-wine bg-wine/5 shadow-[0_0_32px_-8px_rgba(212,175,55,0.5)]"
                  : "border-white/10 hover:border-white/30",
              ].join(" ")}
            >
              <Visual background={s.visual} className="h-40">
                {active ? (
                  <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-wine text-xs font-bold text-white">
                    ✓
                  </span>
                ) : null}
              </Visual>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl text-white">{s.name}</h2>
                  <p className="shrink-0 font-label text-sm font-semibold text-gold">${s.rate}</p>
                </div>
                <p className="mt-2 text-xs text-neutral">
                  {s.size} · {s.occupancy}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.slice(0, 2).map((f) => (
                    <li key={f} className="flex items-baseline gap-2 text-xs text-white/50">
                      <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-wine" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-8 rounded-lg glass p-8 sm:grid-cols-3">
        <Field label="Arrival" htmlFor="bk-in">
          <Input id="bk-in" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </Field>
        <Field label="Departure" htmlFor="bk-out">
          <Input id="bk-out" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </Field>
        <Field label="Guests" htmlFor="bk-guests">
          <Select id="bk-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {error ? (
        <p role="alert" className="mt-6 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </p>
      ) : null}

      <div className="mt-10">
        <Button onClick={onContinue}>Tailor Your Experience</Button>
      </div>
    </div>
  );
}

export function ExperienceStep() {
  const router = useRouter();
  const [chosen, setChosen] = useState<string[]>([]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const d = readDraft();
      if (!d.sanctuary) {
        router.replace("/wine-resort/booking/sanctuary");
        return;
      }
      if (d.experiences) setChosen(d.experiences);
    });
    return () => cancelAnimationFrame(raf);
  }, [router]);

  const toggle = (slug: string) =>
    setChosen((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const onContinue = () => {
    writeDraft({ experiences: chosen });
    router.push("/wine-resort/booking/review");
  };

  return (
    <div>
      <h1 className="font-display text-4xl text-white sm:text-5xl">Tailor your experience.</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral">
        Optional, and priced per person. Skip freely — the estate is generous by
        default.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {experiences.map((e) => {
          const active = chosen.includes(e.slug);
          return (
            <button
              key={e.slug}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(e.slug)}
              className={[
                "flex items-start gap-5 rounded-lg border p-6 text-left transition-all duration-300",
                active
                  ? "border-wine bg-wine/5"
                  : "border-white/10 hover:border-white/30",
              ].join(" ")}
            >
              <span
                aria-hidden
                className={[
                  "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[10px] font-bold transition-colors",
                  active ? "border-wine bg-wine text-white" : "border-white/25 text-transparent",
                ].join(" ")}
              >
                ✓
              </span>
              <span>
                <span className="block font-display text-xl text-white">{e.name}</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-neutral">{e.description}</span>
                <span className="mt-3 block text-xs text-gold">
                  {e.duration} · ${e.price} pp
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button onClick={onContinue}>Review Your Stay</Button>
        <Button href="/wine-resort/booking/sanctuary" variant="ghost">
          ← Back
        </Button>
      </div>
    </div>
  );
}

export function ReviewStep() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [status, setStatus] = useState<"idle" | "confirming" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const d = readDraft();
      if (!d.sanctuary || !d.checkIn || !d.checkOut) {
        router.replace("/wine-resort/booking/sanctuary");
        return;
      }
      setDraft(d);
    });
    return () => cancelAnimationFrame(raf);
  }, [router]);

  if (!draft) {
    return <div className="h-64 animate-pulse rounded-lg bg-surface" aria-hidden />;
  }

  const sanctuary = sanctuaries.find((s) => s.slug === draft.sanctuary)!;
  const chosenExperiences = experiences.filter((e) => draft.experiences?.includes(e.slug));
  const nights = Math.max(
    1,
    Math.round(
      (new Date(draft.checkOut!).getTime() - new Date(draft.checkIn!).getTime()) / 86_400_000
    )
  );
  const guests = draft.guests ?? 2;
  const stayTotal = sanctuary.rate * nights;
  const expTotal = chosenExperiences.reduce((sum, e) => sum + e.price * guests, 0);

  const onConfirm = async () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(REVIEW_PATH)}`);
      return;
    }
    setStatus("confirming");
    setError("");
    try {
      await confirmBooking(draft);
      sessionStorage.removeItem(BOOKING_KEY);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-12 text-center">
        <p className="font-display text-4xl text-white">The estate is expecting you.</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral">
          Your request for {sanctuary.name} is in. The house will confirm
          availability and arrival details by email within the day.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/wine-resort">Back to the Estate</Button>
          <Button href="/wine-resort/experiences" variant="secondary">
            Browse Experiences
          </Button>
        </div>
      </div>
    );
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h1 className="font-display text-4xl text-white sm:text-5xl">Review your stay.</h1>
        <div className="mt-10 overflow-hidden rounded-lg border border-white/10">
          <Visual background={sanctuary.visual} className="h-48" />
          <div className="p-8">
            <h2 className="font-display text-2xl text-white">{sanctuary.name}</h2>
            <p className="mt-2 text-sm text-neutral">{sanctuary.tagline}</p>
            <dl className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-white/40">Arrival</dt>
                <dd className="mt-1 text-white">{fmt(draft.checkIn!)}</dd>
              </div>
              <div>
                <dt className="text-white/40">Departure</dt>
                <dd className="mt-1 text-white">{fmt(draft.checkOut!)}</dd>
              </div>
              <div>
                <dt className="text-white/40">Party</dt>
                <dd className="mt-1 text-white">
                  {guests} {guests === 1 ? "guest" : "guests"} · {nights}{" "}
                  {nights === 1 ? "night" : "nights"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {chosenExperiences.length > 0 ? (
          <div className="mt-6 rounded-lg border border-white/10 p-8">
            <p className="overline-label text-white/45">Experiences</p>
            <ul className="mt-5 space-y-3">
              {chosenExperiences.map((e) => (
                <li key={e.slug} className="flex justify-between text-sm">
                  <span className="text-white">{e.name}</span>
                  <span className="text-white/60">${e.price * guests}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-lg glass p-8 lg:sticky lg:top-32">
          <p className="overline-label text-white/45">Estimate</p>
          <dl className="mt-6 space-y-3.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/50">
                {sanctuary.name} × {nights}
              </dt>
              <dd className="text-white">${stayTotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Experiences</dt>
              <dd className="text-white">{expTotal > 0 ? `$${expTotal}` : "—"}</dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-4">
              <dt className="font-label text-xs font-semibold uppercase tracking-widest text-white">Total</dt>
              <dd className="font-display text-2xl text-gold">${stayTotal + expTotal}</dd>
            </div>
          </dl>
          {error ? (
            <p role="alert" className="mt-6 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
              {error}
            </p>
          ) : null}

          <div className="mt-8 space-y-3">
            <Button onClick={onConfirm} disabled={status === "confirming" || authLoading} className="w-full">
              {status === "confirming"
                ? "Sending to the House…"
                : user
                  ? "Request the Booking"
                  : "Sign In to Request the Booking"}
            </Button>
            <Button href="/wine-resort/booking/experience" variant="ghost" className="w-full">
              ← Adjust Experiences
            </Button>
          </div>
          <p className="mt-5 text-center text-xs text-white/30">
            Nothing is charged until the house confirms.
          </p>
        </div>
      </aside>
    </div>
  );
}
