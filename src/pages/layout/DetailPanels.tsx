import { useState } from 'react'
import {
  Mail,
  Star,
  X,
  ChevronLeft,
  Reply,
  Archive,
  Trash2,
} from 'lucide-react'

type Mode =
  | 'right-overlay'
  | 'right-push'
  | 'left-overlay'
  | 'bottom-sheet'
  | 'modal'
  | 'inline-expand'
  | 'new-page'

const MODES: { id: Mode; label: string; subtitle: string }[] = [
  { id: 'right-overlay', label: '右ドロワー (覆う)', subtitle: 'overlay' },
  { id: 'right-push', label: '右パネル (領域分割)', subtitle: 'push' },
  { id: 'left-overlay', label: '左ドロワー (覆う)', subtitle: 'overlay' },
  { id: 'bottom-sheet', label: 'ボトムシート', subtitle: 'mobile' },
  { id: 'modal', label: 'モーダル', subtitle: 'center' },
  { id: 'inline-expand', label: 'インライン展開', subtitle: 'accordion' },
  { id: 'new-page', label: 'ページ遷移', subtitle: 'replace' },
]

type Item = {
  id: number
  from: string
  subject: string
  preview: string
  body: string
  time: string
  unread?: boolean
  starred?: boolean
}

const ITEMS: Item[] = [
  {
    id: 1,
    from: 'GitHub',
    subject: 'PR #123 がマージされました',
    preview: 'feat: add new design tokens for spacing and typography',
    body:
      'プルリクエスト #123 がメインブランチにマージされました。\n\n— 追加: design-tokens.json\n— 変更: tailwind.config.ts\n\nレビュアー: @yamada-taro\n所要時間: 2日',
    time: '11:23',
    unread: true,
  },
  {
    id: 2,
    from: '山田 太郎',
    subject: 'ミーティング資料を共有',
    preview: '明日の14時のミーティング用に資料を準備しました。',
    body:
      'お疲れ様です。\n\n明日のミーティング (14:00-15:00) で使用する資料を共有します。事前に目を通していただけると助かります。\n\n— アジェンダ\n— 進捗報告\n— 次四半期の計画\n\n山田',
    time: '10:45',
    unread: true,
    starred: true,
  },
  {
    id: 3,
    from: 'Vercel',
    subject: '本番デプロイが完了しました',
    preview: 'design-book.vercel.app への deploy が成功',
    body:
      'デプロイ #4271 が完了しました。\n\n— ブランチ: main\n— コミット: 0c06c63\n— ビルド時間: 24秒\n\n本番URL: design-book.vercel.app',
    time: '09:12',
  },
  {
    id: 4,
    from: '佐藤 花子',
    subject: 'デザインレビューありがとう',
    preview: '指摘いただいた箇所、修正版を上げました。',
    body:
      'デザインレビューありがとうございました。\n\n指摘いただいた以下の点を修正しました:\n1. タイポグラフィのコントラスト調整\n2. ボタンの最小タップ領域 (44pxへ)\n3. アクセントカラーの統一\n\nFigma URL: figma.com/...\n\n佐藤',
    time: '昨日',
  },
  {
    id: 5,
    from: 'Linear',
    subject: '今週の振り返りが届いています',
    preview: '12件のIssueがクローズされました',
    body: '今週は12件のIssueをクローズ、新規8件、進行中5件です。',
    time: '昨日',
  },
]

function List({
  selectedId,
  onSelect,
  expanded,
}: {
  selectedId: number | null
  onSelect: (item: Item) => void
  expanded?: { id: number; body: string } | null
}) {
  return (
    <ul className="divide-y divide-zinc-100">
      {ITEMS.map((it) => (
        <li key={it.id}>
          <button
            onClick={() => onSelect(it)}
            className={`w-full text-left px-4 py-3 hover:bg-zinc-50 transition flex items-start gap-3 ${
              selectedId === it.id ? 'bg-blue-50' : ''
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                it.unread ? 'bg-blue-500' : 'bg-transparent'
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div
                  className={`text-sm truncate ${it.unread ? 'font-semibold' : 'text-zinc-700'}`}
                >
                  {it.from}
                </div>
                <div className="text-xs text-zinc-400 shrink-0 ml-2">
                  {it.time}
                </div>
              </div>
              <div
                className={`text-sm truncate ${it.unread ? 'text-zinc-900 font-medium' : 'text-zinc-600'}`}
              >
                {it.subject}
              </div>
              <div className="text-xs text-zinc-500 truncate mt-0.5">
                {it.preview}
              </div>
            </div>
            {it.starred && (
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 mt-1" />
            )}
          </button>
          {expanded?.id === it.id && (
            <div className="px-4 pb-4 bg-zinc-50 border-t border-zinc-200 animate-slide-in-down">
              <div className="text-sm text-zinc-700 whitespace-pre-wrap pt-3">
                {expanded.body}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function Detail({
  item,
  onClose,
  compact,
}: { item: Item; onClose?: () => void; compact?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <header className="px-5 py-3 border-b border-zinc-200 flex items-center gap-2 bg-white">
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{item.subject}</div>
          <div className="text-xs text-zinc-500">
            {item.from} · {item.time}
          </div>
        </div>
        {!compact && (
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-600">
              <Archive className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-5 text-sm text-zinc-800 whitespace-pre-wrap">
        {item.body}
      </div>
      <footer className="px-5 py-3 border-t border-zinc-200 bg-white">
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-zinc-900 text-white text-sm font-medium">
          <Reply className="w-3.5 h-3.5" />
          返信
        </button>
      </footer>
    </div>
  )
}

const PROS_CONS: Record<Mode, { good: string[]; bad: string[] }> = {
  'right-overlay': {
    good: [
      'メイン画面の文脈を残しつつ詳細を見せられる',
      '実装が比較的シンプル',
    ],
    bad: ['一覧と詳細を並べて比較できない', '画面が狭いと窮屈'],
  },
  'right-push': {
    good: [
      '一覧と詳細を同時に見られる (Mail.app / Slack)',
      'リスト内を次々と確認しやすい',
    ],
    bad: ['それぞれの幅が狭くなる', 'モバイルでは破綻しやすい'],
  },
  'left-overlay': {
    good: ['ナビゲーション補助に向く (詳細用途には少数派)'],
    bad: ['ユーザーは詳細を右と期待しがち。RTL用途以外は違和感'],
  },
  'bottom-sheet': {
    good: [
      'モバイルで親指の届く位置に詳細を出せる',
      '片手操作と相性が良い',
    ],
    bad: [
      '縦に長いコンテンツは見切れる',
      'PCで使うと「下から出る」違和感',
    ],
  },
  modal: {
    good: ['集中して見せたい時 (確認・編集)', 'モバイル/PC両対応'],
    bad: [
      'リスト内を次々確認するのには不向き (毎回閉じる必要)',
      '背景の操作が止まる',
    ],
  },
  'inline-expand': {
    good: [
      'URLや状態が変わらない、コンテキスト切替なし',
      '短い詳細・FAQに最適',
    ],
    bad: [
      '長い詳細はリストが破綻',
      '上下にジャンプして場所を見失いやすい',
    ],
  },
  'new-page': {
    good: [
      '詳細をフルに使える、URL共有可能',
      '戻る/進むのブラウザ操作と一致',
    ],
    bad: [
      'リストの文脈を完全に失う',
      'リスト内を巡回するには「戻る」が必要',
    ],
  },
}

export default function DetailPanels() {
  const [mode, setMode] = useState<Mode>('right-overlay')
  const [selected, setSelected] = useState<Item | null>(null)

  const close = () => setSelected(null)

  const onPick = (m: Mode) => {
    setMode(m)
    setSelected(null)
  }

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        「アイテムをクリックしたら詳細をどこに出すか」のパターン比較。下のモードを切替えてクリックで動作確認。
      </p>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          モードを選ぶ
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => onPick(m.id)}
              className={`text-left rounded-lg border p-3 transition ${
                mode === m.id
                  ? 'border-zinc-900 bg-zinc-50 ring-2 ring-zinc-900/10'
                  : 'border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              <div className="text-sm font-medium">{m.label}</div>
              <div className="text-[11px] text-zinc-500 mt-0.5 font-mono">
                {m.subtitle}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          プレビュー
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-2.5 flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold">受信箱</span>
            <span className="text-xs text-zinc-500">{ITEMS.length} 件</span>
          </div>

          <DemoArea
            mode={mode}
            selected={selected}
            onSelect={setSelected}
            onClose={close}
          />
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          選んだモードの向き・不向き
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
              向いてる
            </div>
            <ul className="list-disc pl-5 space-y-1 text-emerald-900">
              {PROS_CONS[mode].good.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2">
              苦手なところ
            </div>
            <ul className="list-disc pl-5 space-y-1 text-rose-900">
              {PROS_CONS[mode].bad.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function DemoArea({
  mode,
  selected,
  onSelect,
  onClose,
}: {
  mode: Mode
  selected: Item | null
  onSelect: (it: Item) => void
  onClose: () => void
}) {
  if (mode === 'right-push') {
    return (
      <div className="flex h-[520px]">
        <div
          className={`overflow-y-auto transition-all ${
            selected ? 'flex-[2] border-r border-zinc-200' : 'flex-1'
          }`}
        >
          <List selectedId={selected?.id ?? null} onSelect={onSelect} />
        </div>
        {selected && (
          <div className="flex-[3] animate-slide-in-right bg-white">
            <Detail item={selected} onClose={onClose} />
          </div>
        )}
      </div>
    )
  }

  if (mode === 'inline-expand') {
    return (
      <div className="h-[520px] overflow-y-auto">
        <List
          selectedId={selected?.id ?? null}
          onSelect={(it) =>
            onSelect(selected?.id === it.id ? (null as unknown as Item) : it)
          }
          expanded={selected ? { id: selected.id, body: selected.body } : null}
        />
      </div>
    )
  }

  if (mode === 'new-page') {
    if (selected) {
      return (
        <div className="h-[520px]">
          <header className="px-3 py-2 border-b border-zinc-200 flex items-center gap-2 bg-white">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium">戻る</span>
          </header>
          <div className="h-[calc(100%-2.75rem)]">
            <Detail item={selected} compact />
          </div>
        </div>
      )
    }
    return (
      <div className="h-[520px] overflow-y-auto">
        <List selectedId={null} onSelect={onSelect} />
      </div>
    )
  }

  return (
    <div className="relative h-[520px] overflow-hidden">
      <div className="absolute inset-0 overflow-y-auto">
        <List selectedId={selected?.id ?? null} onSelect={onSelect} />
      </div>

      {selected && (mode === 'right-overlay' || mode === 'left-overlay') && (
        <>
          <div
            className="absolute inset-0 bg-black/30 animate-fade-in"
            onClick={onClose}
          />
          <div
            className={`absolute top-0 h-full w-2/3 bg-white shadow-2xl ${
              mode === 'right-overlay'
                ? 'right-0 animate-slide-in-right'
                : 'left-0 animate-slide-in-left'
            }`}
          >
            <Detail item={selected} onClose={onClose} />
          </div>
        </>
      )}

      {selected && mode === 'bottom-sheet' && (
        <>
          <div
            className="absolute inset-0 bg-black/30 animate-fade-in"
            onClick={onClose}
          />
          <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-white rounded-t-2xl shadow-2xl animate-slide-in-up">
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 rounded-full bg-zinc-300" />
            </div>
            <div className="h-[calc(100%-1.5rem)]">
              <Detail item={selected} onClose={onClose} compact />
            </div>
          </div>
        </>
      )}

      {selected && mode === 'modal' && (
        <>
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={onClose}
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
            <div className="w-full max-w-lg max-h-full bg-white rounded-xl shadow-2xl overflow-hidden animate-scale-in pointer-events-auto">
              <Detail item={selected} onClose={onClose} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
