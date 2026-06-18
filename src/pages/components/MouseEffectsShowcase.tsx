import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

function Frame({
  label,
  note,
  children,
  span,
}: { label: string; note?: string; children: React.ReactNode; span?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white overflow-hidden ${
        span ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className="text-sm font-medium">{label}</div>
        {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

/* ─── 1. 光の粒トレイル ─── */
function ParticleTrail() {
  const [parts, setParts] = useState<
    { id: number; x: number; y: number; hue: number }[]
  >([])
  const counter = useRef(0)
  const lastSpawn = useRef(0)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now()
    if (now - lastSpawn.current < 20) return
    lastSpawn.current = now
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = counter.current++
    const hue = 180 + ((id * 17) % 80)
    setParts((p) => [...p, { id, x, y, hue }])
    setTimeout(() => setParts((p) => p.filter((q) => q.id !== id)), 1400)
  }

  return (
    <div
      onMouseMove={onMove}
      className="relative h-64 rounded-lg overflow-hidden cursor-none"
      style={{
        background:
          'radial-gradient(ellipse at center, #1e1b4b 0%, #020617 100%)',
      }}
    >
      <style>{`
        @keyframes mfx-particle {
          0% { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -150%) scale(0.7); }
          100% { opacity: 0; transform: translate(-50%, -250%) scale(0.2); }
        }
      `}</style>
      {parts.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: 8,
            height: 8,
            background: `radial-gradient(circle, hsl(${p.hue}, 100%, 80%) 0%, hsl(${p.hue}, 100%, 60%) 40%, transparent 70%)`,
            boxShadow: `0 0 12px hsl(${p.hue}, 100%, 60%), 0 0 24px hsl(${p.hue}, 100%, 50%)`,
            animation: 'mfx-particle 1.4s ease-out forwards',
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-zinc-400 text-sm">マウスを動かして光の粒を辿る ✨</div>
      </div>
    </div>
  )
}

/* ─── 2. カスタムカーソル + リング ─── */
function CustomCursor() {
  const [pos, setPos] = useState({ x: -50, y: -50 })
  const [ring, setRing] = useState({ x: -50, y: -50 })

  useEffect(() => {
    let raf: number
    const update = () => {
      setRing((r) => ({
        x: r.x + (pos.x - r.x) * 0.18,
        y: r.y + (pos.y - r.y) * 0.18,
      }))
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [pos])

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onMouseLeave={() => setPos({ x: -50, y: -50 })}
      className="relative h-64 rounded-lg bg-white border border-zinc-200 overflow-hidden cursor-none flex items-center justify-center"
    >
      <div className="text-zinc-500 text-sm">ホバーで cursor が dot + ring に</div>
      <div
        className="absolute pointer-events-none w-2 h-2 rounded-full bg-zinc-900"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 100ms',
        }}
      />
      <div
        className="absolute pointer-events-none w-8 h-8 rounded-full border-2 border-zinc-900"
        style={{
          left: ring.x,
          top: ring.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

/* ─── 3. スポットライト ─── */
function Spotlight() {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        })
      }}
      className="relative h-64 rounded-lg overflow-hidden"
      style={{
        background: '#0a0a0f',
        backgroundImage: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(168,85,247,0.25), transparent 40%)`,
      }}
    >
      <div className="absolute inset-0 p-6 grid grid-cols-2 gap-3">
        {['Pricing', 'Features', 'Docs', 'Blog'].map((t) => (
          <div
            key={t}
            className="rounded-lg p-4 border border-white/10 backdrop-blur-sm"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="text-white font-semibold">{t}</div>
            <div className="text-xs text-zinc-400 mt-1">{t} の説明文</div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] text-zinc-500">
        Linear / Vercel 系のスポット光
      </div>
    </div>
  )
}

/* ─── 4. クリック波紋 ─── */
function ClickRipple() {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([])
  const counter = useRef(0)
  return (
    <div
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const id = counter.current++
        setRipples((p) => [
          ...p,
          { id, x: e.clientX - r.left, y: e.clientY - r.top },
        ])
        setTimeout(() => setRipples((p) => p.filter((q) => q.id !== id)), 1000)
      }}
      className="relative h-64 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 overflow-hidden cursor-pointer flex items-center justify-center"
    >
      <style>{`
        @keyframes mfx-ripple {
          from { opacity: 0.4; transform: translate(-50%,-50%) scale(0); }
          to { opacity: 0; transform: translate(-50%,-50%) scale(8); }
        }
      `}</style>
      <div className="text-white font-medium pointer-events-none">
        クリックして波紋を出す
      </div>
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute pointer-events-none rounded-full bg-white"
          style={{
            left: r.x,
            top: r.y,
            width: 40,
            height: 40,
            animation: 'mfx-ripple 1s ease-out forwards',
          }}
        />
      ))}
    </div>
  )
}

/* ─── 5. キラキラ (Sparkle) トレイル ─── */
function SparkleTrail() {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; angle: number; size: number }[]
  >([])
  const counter = useRef(0)
  const last = useRef(0)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now()
    if (now - last.current < 60) return
    last.current = now
    const r = e.currentTarget.getBoundingClientRect()
    const id = counter.current++
    setStars((s) => [
      ...s,
      {
        id,
        x: e.clientX - r.left + (Math.random() - 0.5) * 20,
        y: e.clientY - r.top + (Math.random() - 0.5) * 20,
        angle: Math.random() * 360,
        size: 8 + Math.random() * 12,
      },
    ])
    setTimeout(() => setStars((s) => s.filter((q) => q.id !== id)), 800)
  }
  return (
    <div
      onMouseMove={onMove}
      className="relative h-64 rounded-lg bg-gradient-to-br from-pink-50 to-amber-50 overflow-hidden cursor-none"
    >
      <style>{`
        @keyframes mfx-sparkle {
          0% { opacity: 0; transform: translate(-50%,-50%) rotate(0deg) scale(0); }
          30% { opacity: 1; transform: translate(-50%,-50%) rotate(var(--r)) scale(1); }
          100% { opacity: 0; transform: translate(-50%,-50%) rotate(var(--r)) scale(0.6); }
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-pink-400 text-sm font-medium">
          動かしてキラキラ ✦
        </div>
      </div>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none text-amber-400"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            animation: 'mfx-sparkle 0.8s ease-out forwards',
            ['--r' as string]: `${s.angle}deg`,
          }}
        >
          <Sparkles
            className="w-full h-full"
            style={{
              filter:
                'drop-shadow(0 0 4px #fbbf24) drop-shadow(0 0 8px #f59e0b)',
            }}
          />
        </div>
      ))}
    </div>
  )
}

/* ─── 6. 3D Tilt Card ─── */
function TiltCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        setTilt({ x: -py * 20, y: px * 20 })
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="h-64 rounded-lg flex items-center justify-center bg-zinc-100"
      style={{ perspective: 800 }}
    >
      <div
        className="w-56 h-72 rounded-2xl shadow-2xl transition-transform duration-100 ease-out flex flex-col justify-end p-5 text-white"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          background:
            'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
        }}
      >
        <div className="text-[10px] uppercase tracking-widest opacity-80">
          3D TILT
        </div>
        <div className="text-2xl font-bold mt-1">Hover me</div>
        <div className="text-xs opacity-80 mt-1">cursor で奥行きが出る</div>
      </div>
    </div>
  )
}

/* ─── 7. Magnetic Button ─── */
function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null)
  const [off, setOff] = useState({ x: 0, y: 0 })
  return (
    <div
      onMouseMove={(e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)
        if (dist < 100) {
          setOff({ x: dx * 0.4, y: dy * 0.4 })
        } else {
          setOff({ x: 0, y: 0 })
        }
      }}
      onMouseLeave={() => setOff({ x: 0, y: 0 })}
      className="h-64 rounded-lg bg-zinc-900 flex items-center justify-center overflow-hidden"
    >
      <button
        ref={ref}
        className="px-8 h-12 rounded-full bg-white text-zinc-900 font-semibold text-sm transition-transform duration-150 ease-out"
        style={{ transform: `translate(${off.x}px, ${off.y}px)` }}
      >
        近づくと吸い寄せ
      </button>
    </div>
  )
}

/* ─── 8. ホバー時に文字に下線が伸びる ─── */
function HoverHalo() {
  return (
    <div className="h-64 rounded-lg bg-zinc-50 flex items-center justify-center">
      <div className="flex flex-col gap-3 text-zinc-900 text-lg">
        {['Home', 'Projects', 'About', 'Contact'].map((t) => (
          <button
            key={t}
            className="relative group inline-flex items-center px-1 py-0.5"
          >
            <span className="relative z-10">{t}</span>
            <span className="absolute left-0 right-0 bottom-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 rounded-full" />
            <span className="absolute -inset-2 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(168,85,247,0.15), transparent 70%)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── 9. Smooth lag dot (string ─── */
function StringDot() {
  const [trail, setTrail] = useState<{ x: number; y: number }[]>(
    Array.from({ length: 8 }).map(() => ({ x: 150, y: 100 })),
  )
  const target = useRef({ x: 150, y: 100 })

  useEffect(() => {
    let raf: number
    const tick = () => {
      setTrail((arr) => {
        const next = [...arr]
        next[0] = {
          x: next[0].x + (target.current.x - next[0].x) * 0.3,
          y: next[0].y + (target.current.y - next[0].y) * 0.3,
        }
        for (let i = 1; i < next.length; i++) {
          next[i] = {
            x: next[i].x + (next[i - 1].x - next[i].x) * 0.3,
            y: next[i].y + (next[i - 1].y - next[i].y) * 0.3,
          }
        }
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        target.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      }}
      className="relative h-64 rounded-lg bg-zinc-900 overflow-hidden cursor-none flex items-center justify-center"
    >
      <div className="text-zinc-500 text-sm pointer-events-none">遅延つき紐</div>
      {trail.map((t, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: t.x,
            top: t.y,
            width: 20 - i * 1.8,
            height: 20 - i * 1.8,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, #67e8f9 0%, #22d3ee 60%, transparent 100%)',
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export default function MouseEffectsShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <p className="text-sm text-zinc-700 leading-relaxed">
        マウスエフェクト9種。光の粒トレイル / カスタムカーソル / スポットライト /
        波紋 / キラキラ / 3D傾き / 磁石ボタン / ホバー光 / 遅延紐。各エリア内でだけ
        発火するので他に干渉しない。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame label="1. 光の粒トレイル" note="マウス軌跡に色付きの光が流れて上昇 + 消失">
          <ParticleTrail />
        </Frame>
        <Frame label="2. カスタムカーソル + リング" note="dot + 遅延 ring の2点">
          <CustomCursor />
        </Frame>
        <Frame label="3. スポットライト" note="cursor 位置を中心に光が当たる (Linear/Vercel系)">
          <Spotlight />
        </Frame>
        <Frame label="4. クリック波紋" note="クリック地点から円が拡散">
          <ClickRipple />
        </Frame>
        <Frame label="5. キラキラ ✦" note="動かすたびに sparkle が散らばる">
          <SparkleTrail />
        </Frame>
        <Frame label="6. 3D Tilt Card" note="カード上の位置で奥行きが変わる">
          <TiltCard />
        </Frame>
        <Frame label="7. Magnetic Button" note="近づくと吸い寄せ、離れると戻る">
          <MagneticButton />
        </Frame>
        <Frame label="8. Hover halo / underline grow" note="ナビ項目の hover 演出">
          <HoverHalo />
        </Frame>
        <Frame label="9. 遅延つき紐 (string of dots)" note="徐々に遅れて追ってくる連なり" span>
          <StringDot />
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">気をつけること</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>常時パーティクル生成は CPU/バッテリーを食う → スロットリング必須 (このページは 20-60ms 間隔)</li>
          <li>cursor: none で標準カーソルを隠す時はキーボード操作で全機能に到達可能か確認</li>
          <li>prefers-reduced-motion を必ず尊重する (本プロジェクトは index.css で対応済)</li>
          <li>モバイルではほぼ意味なし — touch では発火しないので fallback 用意</li>
          <li>LP / 1スクリーン用途は OK、業務 UI に常時敷くのは疲労源</li>
        </ul>
      </section>
    </div>
  )
}
