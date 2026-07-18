export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="w-4 h-4 rounded border-zinc-300 accent-zinc-900"
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
