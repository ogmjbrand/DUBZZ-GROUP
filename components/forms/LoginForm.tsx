"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "error";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/group/profile";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    setStatus("sending");
    setError("");
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }
    router.replace(redirectTo);
    router.refresh();
  };

  const signupHref =
    redirectTo === "/group/profile" ? "/signup" : `/signup?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Field label="Email" htmlFor="login-email">
        <Input id="login-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
      </Field>
      <Field label="Password" htmlFor="login-password">
        <Input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? "Signing In…" : "Sign In"}
      </Button>

      <p className="text-center text-sm text-white/40">
        New to Dubzz Group?{" "}
        <Link href={signupHref} className="text-gold hover:text-gold-bright">
          Create an account
        </Link>
      </p>
    </form>
  );
}
