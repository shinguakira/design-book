import { useState } from 'react'
import {
  Camera,
  Upload,
  Image as ImageIcon,
  File as FileIcon,
  Plus,
  X,
  Check,
  User,
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

function Dropzone() {
  const [hover, setHover] = useState(false)
  return (
    <label
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`block max-w-md mx-auto border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        hover ? 'border-blue-500 bg-blue-50' : 'border-zinc-300 hover:border-zinc-400'
      }`}
    >
      <input type="file" multiple className="hidden" />
      <Upload
        className={`w-8 h-8 mx-auto ${hover ? 'text-blue-500' : 'text-zinc-400'}`}
      />
      <div className="mt-2 text-sm font-medium">
        ファイルをドロップ or クリックして選択
      </div>
      <div className="text-xs text-zinc-500 mt-1">
        最大 50MB · PNG / JPG / PDF
      </div>
    </label>
  )
}

function CompactButton() {
  return (
    <label className="inline-flex items-center gap-2 px-3 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium cursor-pointer hover:bg-zinc-800">
      <input type="file" className="hidden" />
      <Upload className="w-4 h-4" />
      ファイルを選ぶ
    </label>
  )
}

function AvatarUpload() {
  const [hasImg, setHasImg] = useState(true)
  return (
    <div className="flex items-center gap-4">
      <label className="relative cursor-pointer group">
        <input type="file" accept="image/*" className="hidden" />
        <div
          className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center ${
            hasImg
              ? 'bg-gradient-to-br from-blue-500 to-violet-600 text-white text-2xl font-bold'
              : 'bg-zinc-200 text-zinc-500'
          }`}
        >
          {hasImg ? 'T' : <User className="w-8 h-8" />}
        </div>
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition">
          <Camera className="w-5 h-5" />
        </div>
      </label>
      <div className="text-sm">
        <div className="font-medium">プロフィール写真</div>
        <div className="text-xs text-zinc-500 mt-0.5">
          クリックでアップロード
        </div>
        <button
          onClick={() => setHasImg(false)}
          className="text-xs text-rose-600 hover:underline mt-1"
        >
          削除
        </button>
      </div>
    </div>
  )
}

function MultiThumbnails() {
  const [files, setFiles] = useState([
    { id: 1, color: 'from-pink-400 to-rose-500' },
    { id: 2, color: 'from-blue-400 to-violet-500' },
    { id: 3, color: 'from-emerald-400 to-teal-500' },
  ])
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl">
      {files.map((f) => (
        <div
          key={f.id}
          className={`relative aspect-square rounded-md bg-gradient-to-br ${f.color}`}
        >
          <button
            onClick={() => setFiles((arr) => arr.filter((x) => x.id !== f.id))}
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-white flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <label className="aspect-square rounded-md border-2 border-dashed border-zinc-300 hover:border-zinc-500 flex items-center justify-center cursor-pointer text-zinc-400">
        <input type="file" multiple accept="image/*" className="hidden" />
        <Plus className="w-6 h-6" />
      </label>
    </div>
  )
}

function CameraTrigger() {
  return (
    <label className="inline-flex flex-col items-center gap-1 cursor-pointer">
      <input type="file" accept="image/*" capture="environment" className="hidden" />
      <div className="w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800">
        <Camera className="w-7 h-7" />
      </div>
      <span className="text-xs text-zinc-500">写真を撮る</span>
    </label>
  )
}

function PreviewedList() {
  type F = { id: number; name: string; size: string; done: boolean }
  const [files] = useState<F[]>([
    { id: 1, name: 'design-spec.pdf', size: '2.4 MB', done: true },
    { id: 2, name: 'mockup-v3.png', size: '3.1 MB', done: true },
    { id: 3, name: 'notes.md', size: '12 KB', done: false },
  ])
  return (
    <ul className="space-y-1.5 max-w-md">
      {files.map((f) => (
        <li
          key={f.id}
          className="flex items-center gap-3 px-3 py-2 rounded-md border border-zinc-200"
        >
          <FileIcon className="w-4 h-4 text-zinc-400" />
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate">{f.name}</div>
            <div className="text-xs text-zinc-500">{f.size}</div>
          </div>
          {f.done ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <span className="text-xs text-zinc-500">完了待ち</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function PasteImage() {
  return (
    <div className="max-w-md rounded-lg border-2 border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">
      <ImageIcon className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
      <div>
        画像をクリップボードから貼り付け (
        <code className="font-mono text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded text-xs">
          Ctrl+V
        </code>
        )
      </div>
    </div>
  )
}

function ImageWithCrop() {
  return (
    <div className="max-w-md">
      <div className="aspect-video rounded-md bg-gradient-to-br from-blue-400 to-violet-500 relative overflow-hidden">
        <div className="absolute inset-4 rounded border-2 border-white shadow-2xl">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full" />
        </div>
        <div className="absolute bottom-2 right-2 inline-flex gap-1">
          <button className="px-3 h-8 rounded-md bg-white text-zinc-900 text-xs font-medium">
            適用
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FileUploadShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Dropzone" note="点線ボックス。ホバーで色変化">
        <Dropzone />
      </Frame>

      <Frame label="2. Compact button" note="フォーム内の単一ファイル選択">
        <CompactButton />
      </Frame>

      <Frame label="3. Avatar upload" note="円形のプロフィール写真">
        <AvatarUpload />
      </Frame>

      <Frame label="4. Multi-thumbnail grid" note="複数画像の管理">
        <MultiThumbnails />
      </Frame>

      <Frame label="5. Camera (mobile)" note="capture=environment でカメラ起動">
        <CameraTrigger />
      </Frame>

      <Frame label="6. Uploaded file list" note="アップロード済の一覧">
        <PreviewedList />
      </Frame>

      <Frame label="7. Image crop UI" note="プレビュー + 4隅ハンドル">
        <ImageWithCrop />
      </Frame>

      <Frame label="8. Paste from clipboard" note="Ctrl+V 受け入れ">
        <PasteImage />
      </Frame>

      <Frame label="9. Native input" note="ブラウザ標準。一番素朴">
        <input
          type="file"
          className="text-sm file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-zinc-900 file:text-white file:cursor-pointer hover:file:bg-zinc-800"
        />
      </Frame>

      <Frame label="10. Folder upload" note="webkitdirectory でフォルダ単位">
        <label className="inline-flex items-center gap-2 px-3 h-9 rounded-md border-2 border-zinc-300 text-sm font-medium cursor-pointer hover:border-zinc-500">
          <input
            type="file"
            multiple
            className="hidden"
            {...({ webkitdirectory: '' } as React.InputHTMLAttributes<HTMLInputElement>)}
          />
          <Upload className="w-4 h-4" />
          フォルダごと送信
        </label>
      </Frame>
    </div>
  )
}
