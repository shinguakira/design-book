import { useEffect, type ReactNode } from "react";

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  side?: "left" | "right";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`absolute top-0 ${
          side === "right" ? "right-0" : "left-0"
        } h-full w-80 bg-white shadow-xl flex flex-col`}
      >
        {title && <div className="px-5 py-4 border-b border-zinc-200 font-semibold">{title}</div>}
        <div className="flex-1 overflow-y-auto p-5 text-sm text-zinc-700">{children}</div>
      </div>
    </div>
  );
}
