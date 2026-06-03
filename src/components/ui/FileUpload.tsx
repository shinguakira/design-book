export function FileUpload({
  onFiles,
  hint = 'PNG, JPG, PDF (10MBまで)',
}: { onFiles?: (files: FileList) => void; hint?: string }) {
  return (
    <label className="block border-2 border-dashed border-zinc-300 rounded-lg p-8 text-center hover:border-zinc-400 cursor-pointer transition bg-white">
      <input
        type="file"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && onFiles?.(e.target.files)}
      />
      <div className="text-3xl text-zinc-300">↑</div>
      <div className="mt-2 text-sm font-medium">
        ファイルをドロップ or クリックして選択
      </div>
      <div className="text-xs text-zinc-500 mt-1">{hint}</div>
    </label>
  )
}
