"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "error" | "check-email";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/group/profile";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("fullName") ?? "");
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");

    if (password !== confirm) {
      setStatus("error");
      setError("Passwords don't match.");
      return;
    }

    setStatus("sending");
    setError("");
    const supabase = createClient();
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (signUpError) {
      setStatus("error");
      setError(signUpError.message);
      return;
    }
    if (!signUpData.session) {
      setStatus("check-email");
      return;
    }
    router.replace(redirectTo);
    router.refresh();
  };

  const loginHref = redirectTo === "/group/profile" ? "/login" : `/login?redirect=${encodeURIComponent(redirectTo)}`;

  if (status === "check-email") {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-8">
        <p className="font-display text-2xl text-white">Check your email.</p>
        <p className="mt-3 text-sm leading-relaxed text-neutral">
          We&apos;ve sent a confirmation link to activate your account. Follow
          it, then sign in.
        </p>
        <div className="mt-6">
          <Button href="/login">Back to Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Field label="Full Name" htmlFor="signup-name">
        <Input id="signup-name" name="fullName" required autoComplete="name" placeholder="Your name" />
      </Field>
      <Field label="Email" htmlFor="signup-email">
        <Input id="signup-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
      </Field>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Password" htmlFor="signup-password">
          <Input
            id="signup-password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </Field>
        <Field label="Confirm Password" htmlFor="signup-confirm">
          <Input
            id="signup-confirm"
            name="confirm"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </Field>
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? "Creating Account…" : "Create Account"}
      </Button>

      <p className="text-center text-sm text-white/40">
        Already have an account?{" "}
        <Link href={loginHref} className="text-gold hover:text-gold-bright">
          Sign in
        </Link>
      </p>
    </form>
  );
}
