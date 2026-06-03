import type { SelectHTMLAttributes } from 'react'

export function Select({
  label,
  options,
  className = '',
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: { value: string; label: string }[]
}) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-medium text-zinc-600 mb-1">{label}</span>}
      <select
        className={`block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white ${className}`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}
