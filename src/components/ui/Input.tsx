import type { InputHTMLAttributes } from "react";

export function Input({
  label,
  error,
  hint,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-medium text-zinc-600 mb-1">{label}</span>}
      <input
        className={`block w-full rounded-md border ${
          error ? "border-red-500" : "border-zinc-300"
        } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 ${className}`}
        {...rest}
      />
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-zinc-500">{hint}</span>
      ) : null}
    </label>
  );
}
