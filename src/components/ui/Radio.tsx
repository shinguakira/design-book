export function Radio({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (v: string) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="w-4 h-4 border-zinc-300 accent-zinc-900"
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
