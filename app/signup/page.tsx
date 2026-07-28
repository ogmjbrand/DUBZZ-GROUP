import type { Metadata } from "next";
import { Suspense } from "react";
import FadeReveal from "@/components/motion/FadeReveal";
import SignupForm from "@/components/forms/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Dubzz Group account.",
};

export default function SignupPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
      <div className="relative mx-auto flex w-full max-w-md flex-col px-6 pb-28 pt-44 sm:px-0">
        <FadeReveal>
          <p className="overline-label text-center text-gold">Dubzz Group</p>
          <h1 className="mt-6 text-center font-display text-4xl leading-tight text-white sm:text-5xl">
            Create your account.
          </h1>
        </FadeReveal>
        <FadeReveal delay={120} className="mt-12">
          <div className="rounded-lg glass p-8 sm:p-10">
            <Suspense>
              <SignupForm />
            </Suspense>
          </div>
        </FadeReveal>
      </div>
    </div>
  );
}
