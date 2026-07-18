import type { TextareaHTMLAttributes } from "react";

export function Textarea({
  label,
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-medium text-zinc-600 mb-1">{label}</span>}
      <textarea
        className={`block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 ${className}`}
        {...rest}
      />
    </label>
  );
}
