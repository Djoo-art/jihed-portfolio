"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <form
        action={formAction}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          className="w-full bg-zinc-800 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {state?.error && (
          <p className="text-red-400 text-sm mb-4">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
        >
          {isPending ? "Checking..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
