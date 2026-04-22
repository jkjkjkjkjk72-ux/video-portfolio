"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full font-mono-meta border border-gray-900 dark:border-gray-100 py-3 hover:bg-gray-900 hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-200 disabled:opacity-40"
    >
      {pending ? "Verifying..." : "Enter"}
    </button>
  );
}

export default function LoginForm() {
  const [state, action] = useFormState(loginAction, {});

  return (
    <form action={action} className="flex flex-col gap-5 w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <label className="font-mono-meta text-gray-400 dark:text-gray-600">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoFocus
          className="bg-transparent border border-gray-200 dark:border-gray-800 px-4 py-3 text-sm outline-none focus:border-gray-600 dark:focus:border-gray-400 transition-colors duration-200"
        />
      </div>

      {state?.error && (
        <p className="font-mono text-xs text-red-500">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
