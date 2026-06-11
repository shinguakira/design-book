import { Bookmark, Heart, Play, Search, Zap } from 'lucide-react'

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
      <div className="p-0">{children}</div>
    </div>
  )
}

/* 1. Stripe */
function Stripe() {
  return (
    <div
      className="p-8 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #fff6ed 0%, #ffe1d2 25%, #c9e5ff 65%, #e1d5ff 100%)',
      }}
    >
      <div className="relative max-w-md">
        <div
          className="text-[10px] uppercase tracking-[0.2em] mb-2"
          style={{ color: '#635bff' }}
        >
          PAYMENTS · BILLING · CONNECT
        </div>
        <h1
          className="text-4xl font-bold leading-tight tracking-tight"
          style={{ color: '#0a2540' }}
        >
          Financial
          <br />
          infrastructure
          <br />
          <span style={{ color: '#635bff' }}>to grow</span> your revenue.
        </h1>
        <p className="text-sm mt-3" style={{ color: '#425466' }}>
          Join millions of companies that use Stripe.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            className="px-4 h-9 rounded-full text-sm font-medium text-white"
            style={{ background: '#0a2540' }}
          >
            Start now →
          </button>
          <button
            className="px-4 h-9 rounded-full text-sm font-medium"
            style={{ color: '#635bff' }}
          >
            Contact sales
          </button>
        </div>
      </div>
    </div>
  )
}

/* 2. Linear */
function Linear() {
  return (
    <div
      className="p-8"
      style={{
        background: '#08090a',
        backgroundImage:
          'radial-gradient(circle at 30% 0%, rgba(118, 110, 255, 0.4) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-md">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs backdrop-blur"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#9d9aa9',
          }}
        >
          <Zap className="w-3 h-3" style={{ color: '#766eff' }} />
          Now with AI agents
        </div>
        <h1
          className="mt-4 text-4xl font-semibold tracking-tight leading-tight"
          style={{ color: '#f7f8f8' }}
        >
          Linear is a
          <br />
          better way to
          <br />
          build products
        </h1>
        <p className="text-sm mt-3" style={{ color: '#9d9aa9' }}>
          Meet the new standard for modern software development.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            className="px-4 h-9 rounded-md text-sm font-medium text-white"
            style={{
              background: '#766eff',
              boxShadow: '0 0 24px rgba(118,110,255,0.4)',
            }}
          >
            Get started
          </button>
          <button
            className="px-4 h-9 rounded-md text-sm font-medium"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#f7f8f8',
            }}
          >
            Watch demo
          </button>
        </div>
      </div>
    </div>
  )
}

/* 3. Vercel */
function Vercel() {
  return (
    <div className="p-10 bg-black">
      <div className="max-w-md text-center mx-auto">
        <div className="text-white text-4xl font-bold tracking-tight leading-tight">
          Develop. Preview. Ship.
        </div>
        <p className="text-sm mt-3" style={{ color: '#a3a3a3' }}>
          Vercel's Frontend Cloud gives developers frameworks, workflows, and
          infrastructure to build a faster, more personalized web.
        </p>
        <div className="mt-5 flex gap-2 justify-center">
          <button className="px-4 h-9 rounded-md bg-white text-black text-sm font-medium hover:bg-zinc-100">
            Start Deploying
          </button>
          <button
            className="px-4 h-9 rounded-md text-sm font-medium"
            style={{
              border: '1px solid #ffffff20',
              color: '#fff',
            }}
          >
            Get a Demo
          </button>
        </div>
        <div className="mt-6 text-[10px] uppercase tracking-widest" style={{ color: '#666' }}>
          Trusted by · Adobe · Nintendo · Vox · Sonos · Notion
        </div>
      </div>
    </div>
  )
}

/* 4. Apple */
function Apple() {
  return (
    <div
      className="p-10 text-center"
      style={{
        background: '#000',
        fontFamily: '-apple-system, "SF Pro Display", sans-serif',
      }}
    >
      <div className="text-[10px] font-semibold text-white mb-2 tracking-wider">
        MacBook Pro
      </div>
      <div
        className="text-5xl font-bold tracking-tight"
        style={{
          background: 'linear-gradient(180deg, #fff 30%, rgba(255,255,255,0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Mind-blowing.
        <br />
        Head-turning.
      </div>
      <p className="text-base mt-4" style={{ color: '#86868b' }}>
        Apple M4. Up to 24-core GPU. 16GB unified memory.
      </p>
      <div className="mt-4 flex gap-4 justify-center text-sm">
        <a className="text-blue-400 hover:underline">Learn more ›</a>
        <a className="text-blue-400 hover:underline">Buy ›</a>
      </div>
    </div>
  )
}

/* 5. Notion */
function Notion() {
  return (
    <div className="p-8" style={{ background: '#fff', color: '#37352f' }}>
      <div
        className="text-xs mb-3"
        style={{ color: '#37352f80', fontFamily: 'serif' }}
      >
        ★ ★ ★ ★ ★ "Notion is exceptional" — Forbes
      </div>
      <h1
        className="text-5xl font-bold leading-[0.95] tracking-tight"
        style={{ fontFamily: '"Lyon", Georgia, serif' }}
      >
        One workspace.
        <br />
        Every team.
      </h1>
      <p className="text-base mt-4" style={{ color: '#37352f80' }}>
        We're more than a doc. Or a table. Customize Notion to work the way
        you do.
      </p>
      <div className="mt-5 flex gap-2 items-center">
        <input
          placeholder="Enter your email"
          className="h-10 px-4 rounded text-sm border outline-none"
          style={{ borderColor: '#37352f20', minWidth: 200 }}
        />
        <button
          className="px-4 h-10 rounded text-sm font-semibold text-white"
          style={{ background: '#37352f' }}
        >
          Get Notion free
        </button>
      </div>
    </div>
  )
}

/* 6. Airbnb */
function Airbnb() {
  return (
    <div className="p-8 bg-white">
      <div
        className="rounded-3xl p-1 mb-4 inline-flex shadow-md"
        style={{ border: '1px solid #ebebeb' }}
      >
        <div className="px-4 py-2 border-r border-zinc-200">
          <div className="text-[10px] font-semibold">場所</div>
          <div className="text-xs text-zinc-500">どこへ行きますか?</div>
        </div>
        <div className="px-4 py-2 border-r border-zinc-200">
          <div className="text-[10px] font-semibold">チェックイン</div>
          <div className="text-xs text-zinc-500">日付追加</div>
        </div>
        <div className="px-4 py-2 flex items-center gap-2">
          <div>
            <div className="text-[10px] font-semibold">ゲスト</div>
            <div className="text-xs text-zinc-500">追加</div>
          </div>
          <button
            className="w-10 h-10 rounded-full text-white flex items-center justify-center ml-2"
            style={{ background: '#ff385c' }}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { color: 'from-amber-300 to-rose-400', name: '京都の町家' },
          { color: 'from-blue-400 to-cyan-300', name: '湘南の海辺' },
          { color: 'from-emerald-400 to-teal-500', name: '軽井沢の別荘' },
        ].map((p) => (
          <div key={p.name}>
            <div
              className={`aspect-square rounded-xl bg-gradient-to-br ${p.color} relative`}
            >
              <button className="absolute top-2 right-2 text-white">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs font-semibold mt-2">{p.name}</div>
            <div className="text-xs text-zinc-500">★ 4.92 · ¥18,500/泊</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 7. Spotify */
function Spotify() {
  return (
    <div className="bg-black p-6">
      <div
        className="rounded-md p-5 relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #1f4f3f 0%, #121212 100%)',
        }}
      >
        <div className="flex gap-4">
          <div
            className="w-28 h-28 shrink-0 shadow-2xl rounded"
            style={{
              background:
                'linear-gradient(135deg, #1db954 0%, #1ed760 50%, #82e0aa 100%)',
            }}
          />
          <div className="flex-1 text-white">
            <div className="text-[10px] uppercase tracking-wider opacity-80">
              Playlist
            </div>
            <div className="text-3xl font-black tracking-tight mt-1">
              Today's Top Hits
            </div>
            <div className="text-xs opacity-70 mt-2">
              The most played tracks · 32,400,123 likes · 2h 12min
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center text-black"
            style={{ background: '#1db954' }}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
          <button className="text-white opacity-70 hover:opacity-100">
            <Heart className="w-6 h-6" />
          </button>
          <button className="text-white opacity-70 text-2xl">⋯</button>
        </div>
      </div>
    </div>
  )
}

/* 8. Discord */
function Discord() {
  return (
    <div className="flex" style={{ background: '#313338', minHeight: 220 }}>
      <div
        className="p-2 flex flex-col gap-2"
        style={{ background: '#1e1f22', width: 60 }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white"
          style={{ background: '#5865f2' }}
        >
          D
        </div>
        <div className="w-11 h-1 rounded mx-auto" style={{ background: '#5865f2' }} />
        {['🎮', '🎵', '✨'].map((e, i) => (
          <div
            key={i}
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg"
            style={{ background: '#313338', color: '#dbdee1' }}
          >
            {e}
          </div>
        ))}
      </div>
      <div className="p-2" style={{ background: '#2b2d31', width: 180 }}>
        <div className="px-2 py-2 text-white font-bold text-sm">
          🎮 Game Squad
        </div>
        <div className="px-1 mt-2 text-[10px] uppercase tracking-wider" style={{ color: '#80848e' }}>
          Text Channels
        </div>
        {['general', 'random', 'announcements'].map((c) => (
          <div key={c} className="px-2 py-1 text-sm flex items-center gap-1" style={{ color: '#949ba4' }}>
            <span>#</span>
            {c}
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="text-white font-bold mb-3">#general</div>
        <div className="flex gap-2 mb-3">
          <div className="w-9 h-9 rounded-full" style={{ background: '#5865f2' }} />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-semibold text-sm">Player1</span>
              <span className="text-[10px]" style={{ color: '#80848e' }}>今日 12:34</span>
            </div>
            <div className="text-sm" style={{ color: '#dbdee1' }}>
              新作 RPG 発売されたぞ ✨
            </div>
          </div>
        </div>
        <div className="rounded-lg p-2 flex items-center gap-2" style={{ background: '#383a40' }}>
          <input
            placeholder="メッセージを送信..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#dbdee1' }}
          />
        </div>
      </div>
    </div>
  )
}

/* 9. GitHub */
function GitHub() {
  return (
    <div style={{ background: '#0d1117' }} className="p-6">
      <div className="flex items-center gap-2 text-sm" style={{ color: '#c9d1d9' }}>
        <span style={{ color: '#58a6ff' }} className="font-medium">acme-org</span>
        <span style={{ color: '#7d8590' }}>/</span>
        <span className="font-bold" style={{ color: '#f0f6fc' }}>awesome-project</span>
        <span
          className="px-2 py-0.5 rounded-full text-xs ml-2"
          style={{ background: '#388bfd1a', color: '#58a6ff', border: '1px solid #388bfd80' }}
        >
          Public
        </span>
      </div>
      <div className="mt-3 flex gap-2 text-xs">
        <button
          className="px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1"
          style={{ background: '#21262d', color: '#f0f6fc', border: '1px solid #f0f6fc1a' }}
        >
          <Bookmark className="w-3 h-3" />
          Star
          <span
            className="ml-1 px-1.5 rounded-full text-[10px]"
            style={{ background: '#0d1117', border: '1px solid #f0f6fc1a' }}
          >
            12.4k
          </span>
        </button>
        <button
          className="px-2.5 py-1 rounded-md font-medium"
          style={{ background: '#21262d', color: '#f0f6fc', border: '1px solid #f0f6fc1a' }}
        >
          Fork 1.2k
        </button>
      </div>
      <div
        className="mt-4 p-3 rounded-md font-mono text-xs"
        style={{ background: '#161b22', border: '1px solid #f0f6fc1a' }}
      >
        <div style={{ color: '#7ee787' }}>+ added new feature</div>
        <div style={{ color: '#ff7b72' }}>- removed deprecated API</div>
        <div style={{ color: '#c9d1d9' }}>{`  const x = 'hello'`}</div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex" style={{ height: 8 }}>
          <div style={{ background: '#3178c6', width: 50, height: 8 }} />
          <div style={{ background: '#f7df1e', width: 24, height: 8 }} />
          <div style={{ background: '#e34c26', width: 12, height: 8 }} />
        </div>
        <div className="text-xs" style={{ color: '#7d8590' }}>
          TypeScript 56% · JS 27% · HTML 13%
        </div>
      </div>
    </div>
  )
}

/* 10. Anthropic */
function Anthropic() {
  return (
    <div className="p-8" style={{ background: '#f5efe6' }}>
      <div
        className="text-[10px] uppercase tracking-[0.32em] mb-3"
        style={{ color: '#cc785c' }}
      >
        ANNOUNCEMENT
      </div>
      <h1
        className="text-4xl leading-tight tracking-tight"
        style={{ color: '#1a0d05', fontFamily: '"Source Serif 4", Georgia, serif' }}
      >
        Claude 4.7,
        <br />
        our most capable model yet.
      </h1>
      <p className="text-sm mt-4" style={{ color: '#5a3a18' }}>
        Stronger reasoning, longer context, and improved code generation.
      </p>
      <div className="mt-5 flex gap-2">
        <button
          className="px-5 h-10 rounded-md text-sm font-medium text-white"
          style={{ background: '#cc785c' }}
        >
          Try Claude
        </button>
        <button
          className="px-5 h-10 rounded-md text-sm font-medium"
          style={{
            color: '#1a0d05',
            border: '1px solid #1a0d0533',
          }}
        >
          Read the paper →
        </button>
      </div>
    </div>
  )
}

/* 11. YouTube */
function YouTube() {
  return (
    <div className="p-5 bg-white">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-6 rounded-md flex items-center justify-center text-white"
          style={{ background: '#ff0000' }}
        >
          <Play className="w-3 h-3 fill-current ml-0.5" />
        </div>
        <span className="font-bold tracking-tight">YouTube</span>
        <div className="flex-1" />
        <div className="flex border border-zinc-300 rounded-full max-w-xs flex-1">
          <input
            placeholder="検索"
            className="flex-1 px-3 py-1.5 text-sm outline-none rounded-l-full"
          />
          <button className="px-4 bg-zinc-100 border-l border-zinc-300 rounded-r-full">
            <Search className="w-4 h-4 text-zinc-700" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {['#dc2626', '#2563eb', '#16a34a'].map((c, i) => (
          <div key={i}>
            <div className="aspect-video rounded-xl relative" style={{ background: c }}>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1 rounded">
                {12 + i}:34
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="w-7 h-7 rounded-full" style={{ background: '#e5e7eb' }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold line-clamp-2">
                  動画タイトル {i + 1} について解説します
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  チャンネル名 · 12万 回視聴 · 3 日前
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 12. Tailwind CSS */
function Tailwind() {
  return (
    <div className="p-8 bg-white">
      <div
        className="text-3xl font-extrabold tracking-tight"
        style={{ color: '#0f172a' }}
      >
        Rapidly build modern websites
        <br />
        without ever leaving your HTML.
      </div>
      <div
        className="mt-4 rounded-md p-3 font-mono text-xs"
        style={{ background: '#1e293b', color: '#e2e8f0' }}
      >
        <div>
          <span style={{ color: '#94a3b8' }}>{'<div '}</span>
          <span style={{ color: '#7dd3fc' }}>className</span>
          <span style={{ color: '#94a3b8' }}>=</span>
          <span style={{ color: '#fcd34d' }}>"flex items-center gap-4 p-6"</span>
          <span style={{ color: '#94a3b8' }}>{'>'}</span>
        </div>
        <div className="pl-4">
          <span style={{ color: '#94a3b8' }}>{'<img '}</span>
          <span style={{ color: '#7dd3fc' }}>className</span>
          <span style={{ color: '#94a3b8' }}>=</span>
          <span style={{ color: '#fcd34d' }}>"w-12 h-12 rounded-full"</span>
          <span style={{ color: '#94a3b8' }}>{' />'}</span>
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>{'</div>'}</span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="px-4 h-10 rounded-md text-sm font-semibold text-white"
          style={{ background: '#0ea5e9' }}
        >
          Get started
        </button>
        <button className="px-4 h-10 rounded-md text-sm font-semibold border border-zinc-300 inline-flex items-center gap-2">
          <Search className="w-3.5 h-3.5" />
          Quick search...
          <span className="text-xs text-zinc-500 border border-zinc-300 rounded px-1.5">
            ⌘K
          </span>
        </button>
      </div>
    </div>
  )
}

export default function FamousSites() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        実在する有名サイトのデザインを「指紋」として並べたカタログ。
        色・タイポ・余白・CTA の選び方が会社ごとに大きく違うのが分かる。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame label="Stripe" note="グラデ hero + Serif + パステル">
          <Stripe />
        </Frame>
        <Frame label="Linear" note="黒 + 紫グロー + シャープ">
          <Linear />
        </Frame>
        <Frame label="Vercel" note="純黒白 + 中央寄せ + 太字">
          <Vercel />
        </Frame>
        <Frame label="Apple" note="黒背景 + 巨大タイトル + SF Pro">
          <Apple />
        </Frame>
        <Frame label="Notion" note="白+黒 + Serif + シンプル CTA">
          <Notion />
        </Frame>
        <Frame label="Airbnb" note="ピンク CTA + 角丸大 + 写真主役">
          <Airbnb />
        </Frame>
        <Frame label="Spotify" note="黒地 + 緑アクセント + アルバム主役">
          <Spotify />
        </Frame>
        <Frame label="Discord" note="ブラーパープル + ダーク + 絵文字" span>
          <Discord />
        </Frame>
        <Frame label="GitHub" note="ダーク + コード色 + Star/Fork" span>
          <GitHub />
        </Frame>
        <Frame label="Anthropic" note="クリーム + Serif + テラコッタ">
          <Anthropic />
        </Frame>
        <Frame label="YouTube" note="白 + 赤アクセント + サムネ Grid" span>
          <YouTube />
        </Frame>
        <Frame label="Tailwind CSS Docs" note="水色 + ダークコード + ⌘K" span>
          <Tailwind />
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">「指紋」の構成要素</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>色</b> — 1色のアクセント (Stripe紫 / Linear紫 / Airbnb桃 / Spotify緑 /
            YouTube赤 / Anthropic テラコッタ) で識別される
          </li>
          <li>
            <b>タイポ</b> — Sans serif (Vercel/Linear) vs Serif (Notion/Anthropic) で
            印象が真逆
          </li>
          <li>
            <b>CTA の形</b> — 角丸 (大/中/小) + ボーダー有無で「気軽さ」が決まる
          </li>
          <li>
            <b>余白</b> — 文字密度 (Apple 巨大タイトル) と (Notion テキスト多め) の差
          </li>
          <li>
            <b>背景</b> — グラデーション (Stripe / Linear) vs 純黒/白 (Vercel)
          </li>
        </ul>
      </section>
    </div>
  )
}
