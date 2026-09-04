"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const authError = searchParams.get("error") === "auth";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-5xl uppercase leading-none">
          Client <span className="text-accent">Login</span>
        </h1>
        <p className="mt-3 text-ink/60">
          Enter your email and we&apos;ll send you a secure sign-in link.
        </p>

        {status === "sent" ? (
          <p className="mt-8 border border-ink/15 bg-white p-5">
            Check your email — your sign-in link is on the way.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full border border-ink/20 bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-ink px-4 py-3 text-sm uppercase tracking-widest text-paper transition-colors hover:bg-accent disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send sign-in link"}
            </button>
          </form>
        )}

        {(status === "error" || authError) && (
          <p className="mt-4 text-sm text-accent">
            {authError
              ? "That sign-in link is invalid or expired. Request a new one."
              : "Something went wrong sending the link. Try again."}
          </p>
        )}
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
