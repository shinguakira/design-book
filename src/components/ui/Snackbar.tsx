import { useEffect, useState } from "react";

type Tone = "info" | "success" | "error";

const toneClass: Record<Tone, string> = {
  info: "bg-zinc-900 text-white",
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
};

export function Snackbar({
  open,
  message,
  tone = "info",
  onClose,
  duration = 3000,
}: {
  open: boolean;
  message: string;
  tone?: Tone;
  onClose?: () => void;
  duration?: number;
}) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
    if (!open) return;
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center z-50">
      <div
        className={[
          "pointer-events-auto rounded-md px-4 py-2.5 text-sm shadow-lg",
          toneClass[tone],
        ].join(" ")}
      >
        {message}
      </div>
    </div>
  );
}
