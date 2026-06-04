import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import {
  CarrierBird,
  FoldedNewsletter,
  LetterOpener,
  RolledLetter,
  SealedEnvelope,
} from './MailIcons'

export type DrawerAnim = 'envelope' | 'unfold' | 'drop'

export const DRAWER_ANIMS: DrawerAnim[] = ['envelope', 'unfold', 'drop']

export const pickRandomAnim = (): DrawerAnim =>
  DRAWER_ANIMS[Math.floor(Math.random() * DRAWER_ANIMS.length)]

const ICONS: Record<
  DrawerAnim,
  (props: { className?: string }) => JSX.Element
> = {
  envelope: SealedEnvelope,
  unfold: FoldedNewsletter,
  drop: RolledLetter,
}

type Props = {
  variant: DrawerAnim
  open: boolean
  onClose: () => void
  title: string
  meta?: ReactNode
  bodyKey?: string | number
  children?: ReactNode
}

export function PaperModal({
  variant,
  open,
  onClose,
  title,
  meta,
  bodyKey,
  children,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  const Icon = ICONS[variant]

  return (
    <div
      key={bodyKey ?? variant}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a1d10]/45 backdrop-blur-[2px]"
      data-anim={variant}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <span className="mail-stage" aria-hidden>
        <span className="mail-courier">
          {variant === 'envelope' && (
            <span className="mail-bird">
              <CarrierBird />
            </span>
          )}
          <Icon className="mail-icon" />
        </span>
      </span>

      {variant === 'envelope' && (
        <span className="pm-knife" aria-hidden>
          <LetterOpener />
        </span>
      )}

      <div
        aria-modal="true"
        aria-label={title}
        className="pm-panel relative m-0 max-h-[88vh] w-[92vw] max-w-3xl overflow-y-auto border-2 border-[#b89e6b]/70 bg-[#f4ead4] shadow-2xl shadow-[#2a1d10]/40"
      >
        {variant === 'envelope' && <span className="pm-flap" aria-hidden />}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#b89e6b]/60 bg-[#e8dcbd]/70 px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a5a30]">
            {meta}
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded hover:bg-[#b89e6b]/30 text-[#5a3a18] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
