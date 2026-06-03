import { useEffect, useRef, useState } from 'react'
import {
  Folder,
  FolderOpen,
  FolderClosed,
  FolderDot,
  FolderGit2,
  FolderLock,
  FolderSearch,
  ChevronRight,
  File,
  Home,
  Star,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
  FolderPlus,
  Copy,
} from 'lucide-react'

function Frame({
  label,
  note,
  children,
}: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className="text-sm font-medium">{label}</div>
        {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

type TreeNodeData = {
  id: string
  name: string
  type: 'folder' | 'file'
  children?: TreeNodeData[]
}

const INITIAL_TREE: TreeNodeData[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'src/components',
        name: 'components',
        type: 'folder',
        children: [
          {
            id: 'src/components/ui',
            name: 'ui',
            type: 'folder',
            children: [
              { id: 'src/components/ui/Button.tsx', name: 'Button.tsx', type: 'file' },
              { id: 'src/components/ui/Card.tsx', name: 'Card.tsx', type: 'file' },
              { id: 'src/components/ui/Input.tsx', name: 'Input.tsx', type: 'file' },
            ],
          },
          { id: 'src/components/icons', name: 'icons', type: 'folder', children: [] },
        ],
      },
      {
        id: 'src/pages',
        name: 'pages',
        type: 'folder',
        children: [
          { id: 'src/pages/Home.tsx', name: 'Home.tsx', type: 'file' },
          { id: 'src/pages/About.tsx', name: 'About.tsx', type: 'file' },
        ],
      },
      { id: 'src/index.tsx', name: 'index.tsx', type: 'file' },
    ],
  },
  { id: 'package.json', name: 'package.json', type: 'file' },
  { id: 'README.md', name: 'README.md', type: 'file' },
]

type TreeCtx = {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  renamingId: string | null
  setRenamingId: (id: string | null) => void
  rename: (id: string, name: string) => void
  remove: (id: string) => void
  duplicate: (id: string) => void
  addChild: (id: string) => void
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
}

function ContextMenu({
  ctx,
  node,
}: { ctx: TreeCtx; node: TreeNodeData }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) ctx.setOpenMenuId(null)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [ctx])
  return (
    <div
      ref={ref}
      className="absolute right-0 top-7 z-10 w-44 rounded-md border border-zinc-200 bg-white shadow-lg py-1 animate-slide-in-down"
    >
      <button
        onClick={() => {
          ctx.setRenamingId(node.id)
          ctx.setOpenMenuId(null)
        }}
        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
      >
        <Pencil className="w-3.5 h-3.5 text-zinc-500" />
        名前を変更
      </button>
      <button
        onClick={() => {
          ctx.duplicate(node.id)
          ctx.setOpenMenuId(null)
        }}
        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
      >
        <Copy className="w-3.5 h-3.5 text-zinc-500" />
        複製
      </button>
      {node.type === 'folder' && (
        <button
          onClick={() => {
            ctx.addChild(node.id)
            ctx.setOpenMenuId(null)
          }}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
        >
          <FolderPlus className="w-3.5 h-3.5 text-zinc-500" />
          新規フォルダ
        </button>
      )}
      <div className="h-px bg-zinc-200 my-1" />
      <button
        onClick={() => {
          ctx.remove(node.id)
          ctx.setOpenMenuId(null)
        }}
        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-rose-50 text-rose-600 text-left"
      >
        <Trash2 className="w-3.5 h-3.5" />
        削除
      </button>
    </div>
  )
}

function TreeNode({
  node,
  depth = 0,
  defaultOpen = false,
  ctx,
}: {
  node: TreeNodeData
  depth?: number
  defaultOpen?: boolean
  ctx: TreeCtx
}) {
  const [open, setOpen] = useState(defaultOpen)
  const isFolder = node.type === 'folder'
  const isRenaming = ctx.renamingId === node.id
  const isSelected = ctx.selectedId === node.id
  const menuOpen = ctx.openMenuId === node.id
  const [nameDraft, setNameDraft] = useState(node.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isRenaming) {
      setNameDraft(node.name)
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
  }, [isRenaming, node.name])

  const finishRename = (save: boolean) => {
    if (save) {
      const trimmed = nameDraft.trim()
      if (trimmed) ctx.rename(node.id, trimmed)
    }
    ctx.setRenamingId(null)
  }

  return (
    <div>
      <div
        className={`group relative flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer ${
          isSelected ? 'bg-blue-100' : 'hover:bg-zinc-100'
        }`}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={() => {
          ctx.setSelectedId(node.id)
          if (isFolder) setOpen((o) => !o)
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          ctx.setOpenMenuId(node.id)
        }}
      >
        {isFolder ? (
          <ChevronRight
            className={`w-3 h-3 text-zinc-400 transition-transform shrink-0 ${open ? 'rotate-90' : ''}`}
          />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        {isFolder ? (
          open ? (
            <FolderOpen className="w-4 h-4 text-amber-500 fill-amber-100 shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-amber-500 fill-amber-100 shrink-0" />
          )
        ) : (
          <File className="w-4 h-4 text-zinc-400 shrink-0" />
        )}
        {isRenaming ? (
          <input
            ref={inputRef}
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={() => finishRename(true)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') finishRename(true)
              else if (e.key === 'Escape') finishRename(false)
            }}
            className="flex-1 text-sm bg-white border border-blue-500 rounded px-1 py-0 outline-none"
          />
        ) : (
          <span className="text-sm flex-1 truncate">{node.name}</span>
        )}
        {!isRenaming && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              ctx.setOpenMenuId(menuOpen ? null : node.id)
            }}
            className={`shrink-0 w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition ${
              menuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        )}
        {menuOpen && <ContextMenu ctx={ctx} node={node} />}
      </div>
      {isFolder && open && node.children && (
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 w-px bg-zinc-200"
            style={{ left: `${8 + depth * 16 + 6}px` }}
          />
          {node.children.length === 0 ? (
            <div
              className="text-xs text-zinc-400 italic px-2 py-1"
              style={{ paddingLeft: `${8 + (depth + 1) * 16 + 12}px` }}
            >
              (空)
            </div>
          ) : (
            node.children.map((c) => (
              <TreeNode
                key={c.id}
                node={c}
                depth={depth + 1}
                defaultOpen={false}
                ctx={ctx}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

function transformTree(
  tree: TreeNodeData[],
  fn: (n: TreeNodeData) => TreeNodeData | null,
): TreeNodeData[] {
  const out: TreeNodeData[] = []
  for (const n of tree) {
    const transformed = fn(n)
    if (transformed === null) continue
    if (transformed.children) {
      transformed.children = transformTree(transformed.children, fn)
    }
    out.push(transformed)
  }
  return out
}

function findAndAddSibling(
  tree: TreeNodeData[],
  id: string,
  builder: (orig: TreeNodeData) => TreeNodeData,
): TreeNodeData[] {
  const out: TreeNodeData[] = []
  for (const n of tree) {
    out.push(n)
    if (n.id === id) {
      out.push(builder(n))
    } else if (n.children) {
      n.children = findAndAddSibling(n.children, id, builder)
    }
  }
  return out
}

function findAndAddChild(
  tree: TreeNodeData[],
  parentId: string,
  child: TreeNodeData,
): TreeNodeData[] {
  return tree.map((n) => {
    if (n.id === parentId && n.type === 'folder') {
      return { ...n, children: [...(n.children ?? []), child] }
    }
    if (n.children) {
      return { ...n, children: findAndAddChild(n.children, parentId, child) }
    }
    return n
  })
}

function InteractiveTree() {
  const [tree, setTree] = useState<TreeNodeData[]>(INITIAL_TREE)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [counter, setCounter] = useState(1)

  const rename = (id: string, name: string) => {
    setTree((t) =>
      transformTree(t, (n) => (n.id === id ? { ...n, name } : n)),
    )
  }

  const remove = (id: string) => {
    setTree((t) => transformTree(t, (n) => (n.id === id ? null : n)))
    if (selectedId === id) setSelectedId(null)
  }

  const duplicate = (id: string) => {
    const c = counter
    setCounter((n) => n + 1)
    setTree((t) =>
      findAndAddSibling(t, id, (orig) => ({
        ...orig,
        id: `${orig.id}-copy-${c}`,
        name: `${orig.name} のコピー`,
        children: orig.children ? JSON.parse(JSON.stringify(orig.children)) : undefined,
      })),
    )
  }

  const addChild = (parentId: string) => {
    const c = counter
    setCounter((n) => n + 1)
    const newId = `${parentId}/new-folder-${c}`
    setTree((t) =>
      findAndAddChild(t, parentId, {
        id: newId,
        name: '新規フォルダ',
        type: 'folder',
        children: [],
      }),
    )
    setRenamingId(newId)
  }

  const ctx: TreeCtx = {
    selectedId,
    setSelectedId,
    renamingId,
    setRenamingId,
    rename,
    remove,
    duplicate,
    addChild,
    openMenuId,
    setOpenMenuId,
  }

  return (
    <div className="max-w-sm" onClick={() => setOpenMenuId(null)}>
      {tree.map((n) => (
        <TreeNode key={n.id} node={n} defaultOpen={n.id === 'src'} ctx={ctx} />
      ))}
      <div className="mt-3 text-xs text-zinc-500 space-y-0.5">
        <div>• クリックで選択 / フォルダは展開</div>
        <div>• 右クリック or 「⋯」ボタンでメニュー</div>
        <div>• 名前変更は Enter で確定、Esc でキャンセル</div>
      </div>
    </div>
  )
}

export default function FolderNav() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        フォルダ・階層UIのバリエーション。アイコン・ツリー・ブレッドクラム・ピン留めなど、ファイル種類に依存しない表現。
      </p>

      <Frame label="フォルダアイコンのバリエーション" note="状態・属性で塗りや色を変える">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { Icon: Folder, label: '閉', cls: 'text-amber-500 fill-amber-100' },
            { Icon: FolderOpen, label: '開', cls: 'text-amber-500 fill-amber-100' },
            { Icon: FolderClosed, label: '完全閉', cls: 'text-zinc-500' },
            { Icon: FolderDot, label: '未読あり', cls: 'text-blue-500 fill-blue-100' },
            { Icon: FolderLock, label: '保護', cls: 'text-zinc-700' },
            { Icon: FolderGit2, label: 'Gitリポ', cls: 'text-orange-500' },
            { Icon: FolderSearch, label: '検索結果', cls: 'text-violet-500' },
          ].map((it) => (
            <div
              key={it.label}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition"
            >
              <it.Icon className={`w-9 h-9 ${it.cls}`} />
              <span className="text-xs text-zinc-600">{it.label}</span>
            </div>
          ))}
        </div>
      </Frame>

      <Frame label="色分けフォルダ (タグ的に使う)" note="プロジェクト識別・優先度で">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {[
            { color: 'text-amber-500 fill-amber-100', name: '通常' },
            { color: 'text-blue-500 fill-blue-100', name: '仕事' },
            { color: 'text-emerald-500 fill-emerald-100', name: '完了' },
            { color: 'text-rose-500 fill-rose-100', name: '重要' },
            { color: 'text-violet-500 fill-violet-100', name: '個人' },
            { color: 'text-cyan-500 fill-cyan-100', name: 'メモ' },
            { color: 'text-zinc-500 fill-zinc-100', name: '保管' },
            { color: 'text-pink-500 fill-pink-100', name: 'お気に入り' },
          ].map((it) => (
            <div key={it.name} className="flex flex-col items-center gap-1.5">
              <Folder className={`w-10 h-10 ${it.color}`} />
              <span className="text-[11px] text-zinc-600">{it.name}</span>
            </div>
          ))}
        </div>
      </Frame>

      <Frame label="件数・通知バッジ付き" note="未読件数・新着・容量超過を可視化">
        <div className="flex flex-wrap gap-6">
          <div className="relative inline-flex flex-col items-center gap-1.5">
            <div className="relative">
              <Folder className="w-12 h-12 text-amber-500 fill-amber-100" />
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center">
                12
              </span>
            </div>
            <span className="text-xs text-zinc-600">受信箱</span>
          </div>
          <div className="inline-flex flex-col items-center gap-1.5">
            <div className="relative">
              <Folder className="w-12 h-12 text-blue-500 fill-blue-100" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
            </div>
            <span className="text-xs text-zinc-600">新着あり</span>
          </div>
          <div className="inline-flex flex-col items-center gap-1.5">
            <div className="relative">
              <Folder className="w-12 h-12 text-rose-500 fill-rose-100" />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
                !
              </span>
            </div>
            <span className="text-xs text-zinc-600">容量超過</span>
          </div>
        </div>
      </Frame>

      <Frame label="ブレッドクラム" note="現在地と階層を1行で">
        <nav className="flex items-center gap-1 text-sm flex-wrap">
          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-100 text-zinc-500">
            <Home className="w-3.5 h-3.5" />
          </button>
          {['Documents', 'Projects', 'brighty', 'src', 'components'].map(
            (seg, i, arr) => (
              <span key={seg} className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                <button
                  className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-100 ${
                    i === arr.length - 1
                      ? 'text-zinc-900 font-medium'
                      : 'text-zinc-500'
                  }`}
                >
                  <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
                  {seg}
                </button>
              </span>
            ),
          )}
        </nav>
      </Frame>

      <Frame
        label="ツリー (展開・折り畳み・名前変更・削除)"
        note="クリック / 右クリック / 「⋯」で操作"
      >
        <InteractiveTree />
      </Frame>

      <Frame label="フォルダグリッド (Finder風)" note="サムネ + ラベル">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {['Design', 'Docs', '2024', '2025', 'Archive', 'Misc'].map((name, i) => (
            <button
              key={name}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-zinc-100 transition"
            >
              <Folder
                className={`w-14 h-14 ${
                  i % 3 === 0
                    ? 'text-amber-500 fill-amber-100'
                    : i % 3 === 1
                      ? 'text-blue-500 fill-blue-100'
                      : 'text-violet-500 fill-violet-100'
                }`}
              />
              <span className="text-xs text-zinc-700 truncate w-full text-center">
                {name}
              </span>
            </button>
          ))}
        </div>
      </Frame>

      <Frame
        label="ピン留め / 最近使った"
        note="サイドバー上部に置く一覧 (VS Code / Finder)"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              <Star className="w-3.5 h-3.5" />
              ピン留め
            </div>
            <ul className="space-y-0.5">
              {['Inbox', 'Projects', 'Design Book', 'Tasks'].map((n) => (
                <li key={n}>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 text-sm">
                    <Folder className="w-4 h-4 text-amber-500 fill-amber-100" />
                    {n}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              <Clock className="w-3.5 h-3.5" />
              最近使った
            </div>
            <ul className="space-y-0.5">
              {[
                { name: 'design-spec.pdf', time: '11:23' },
                { name: 'meeting-notes.md', time: '昨日' },
                { name: 'budget-2025.xlsx', time: '3日前' },
              ].map((it) => (
                <li key={it.name}>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 text-sm">
                    <File className="w-4 h-4 text-zinc-400" />
                    <span className="flex-1 truncate text-left">
                      {it.name}
                    </span>
                    <span className="text-xs text-zinc-400">{it.time}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Frame>

      <Frame label="空フォルダの表現" note="アイコンの違い + 補助テキスト">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="text-center p-6 border border-zinc-200 rounded-lg">
            <Folder className="w-12 h-12 text-zinc-300 mx-auto" />
            <div className="text-sm font-medium mt-2">空フォルダ</div>
            <div className="text-xs text-zinc-500 mt-1">
              アイコンは薄く、塗り無しに
            </div>
          </div>
          <div className="text-center p-6 border-2 border-dashed border-zinc-300 rounded-lg">
            <Folder className="w-12 h-12 text-zinc-400 mx-auto" />
            <div className="text-sm font-medium mt-2">新規追加可</div>
            <div className="text-xs text-zinc-500 mt-1">
              枠を破線にしてヒント
            </div>
          </div>
          <div className="text-center p-6 border border-zinc-200 rounded-lg">
            <FolderSearch className="w-12 h-12 text-zinc-400 mx-auto" />
            <div className="text-sm font-medium mt-2">該当なし</div>
            <div className="text-xs text-zinc-500 mt-1">
              検索結果ゼロ件はFolderSearch
            </div>
          </div>
        </div>
      </Frame>
    </div>
  )
}
