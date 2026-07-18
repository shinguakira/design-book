import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Heart,
  Loader2,
  Plus,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";

function Frame({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className="text-sm font-medium">{label}</div>
        {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
      </div>
      <div className="p-5 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function LoadingBtn() {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
      }}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium disabled:opacity-80"
    >
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {loading ? "送信中..." : "送信"}
    </button>
  );
}

function ToggleGroup() {
  const [v, setV] = useState<"l" | "c" | "r">("c");
  return (
    <div className="inline-flex border border-zinc-300 rounded-md overflow-hidden">
      {[
        { id: "l", label: "左揃え" },
        { id: "c", label: "中央" },
        { id: "r", label: "右揃え" },
      ].map((o) => (
        <button
          key={o.id}
          onClick={() => setV(o.id as "l" | "c" | "r")}
          className={`px-3 h-9 text-sm border-l border-zinc-300 first:border-l-0 ${
            v === o.id ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50 text-zinc-700"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function ButtonShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Solid (variants)" note="ベタ塗り。最も汎用">
        <button className="px-4 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800">
          Primary
        </button>
        <button className="px-4 h-9 rounded-md bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200">
          Secondary
        </button>
        <button className="px-4 h-9 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500">
          Accent
        </button>
        <button className="px-4 h-9 rounded-md bg-rose-600 text-white text-sm font-medium hover:bg-rose-500">
          Danger
        </button>
        <button className="px-4 h-9 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500">
          Success
        </button>
      </Frame>

      <Frame label="2. Outlined" note="塗りなし枠線。フォーム横の補助">
        <button className="px-4 h-9 rounded-md border border-zinc-900 text-zinc-900 text-sm font-medium hover:bg-zinc-50">
          Outline
        </button>
        <button className="px-4 h-9 rounded-md border-2 border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50">
          Strong
        </button>
        <button className="px-4 h-9 rounded-md border border-rose-600 text-rose-600 text-sm font-medium hover:bg-rose-50">
          Danger
        </button>
        <button className="px-4 h-9 rounded-md border border-dashed border-zinc-400 text-zinc-700 text-sm font-medium hover:border-zinc-700">
          + 行を追加
        </button>
      </Frame>

      <Frame label="3. Soft / Tonal" note="薄塗り + 濃文字。Material 3 で多用">
        <button className="px-4 h-9 rounded-md bg-blue-100 text-blue-800 text-sm font-medium hover:bg-blue-200">
          Soft Blue
        </button>
        <button className="px-4 h-9 rounded-md bg-emerald-100 text-emerald-800 text-sm font-medium hover:bg-emerald-200">
          Soft Green
        </button>
        <button className="px-4 h-9 rounded-md bg-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-200">
          Soft Amber
        </button>
        <button className="px-4 h-9 rounded-md bg-rose-100 text-rose-800 text-sm font-medium hover:bg-rose-200">
          Soft Rose
        </button>
        <button className="px-4 h-9 rounded-md bg-violet-100 text-violet-800 text-sm font-medium hover:bg-violet-200">
          Soft Violet
        </button>
      </Frame>

      <Frame label="4. Ghost / Text" note="背景なし。ナビ・テキストリンク">
        <button className="px-3 h-9 rounded-md text-zinc-700 text-sm font-medium hover:bg-zinc-100">
          Ghost
        </button>
        <button className="px-3 h-9 rounded-md text-blue-600 text-sm font-medium hover:bg-blue-50">
          Link blue
        </button>
        <button className="text-sm text-blue-600 underline underline-offset-2 hover:text-blue-700">
          Underlined link
        </button>
      </Frame>

      <Frame label="5. Gradient" note="ヒーロー CTA。控えめに使う">
        <button className="px-5 h-10 rounded-md text-white text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-600 hover:shadow-lg shadow-blue-500/30 transition">
          Get Started
        </button>
        <button className="px-5 h-10 rounded-md text-white text-sm font-semibold bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 hover:shadow-lg shadow-pink-500/30 transition">
          Upgrade
        </button>
        <button className="px-5 h-10 rounded-md text-white text-sm font-semibold bg-gradient-to-br from-zinc-700 to-zinc-900 hover:shadow-lg transition">
          Sign in
        </button>
      </Frame>

      <Frame label="6. Pill / Round" note="角丸最大。柔らかい印象">
        <button className="px-5 h-9 rounded-full bg-zinc-900 text-white text-sm font-medium">
          Subscribe
        </button>
        <button className="px-4 h-8 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
          Filter
        </button>
        <button className="px-4 h-8 rounded-full border border-zinc-300 text-zinc-700 text-xs font-medium hover:border-zinc-500">
          Tag
        </button>
      </Frame>

      <Frame label="7. 3D / Press" note="影で物理感。押下で沈む">
        <button className="px-5 h-10 rounded-md bg-blue-600 text-white text-sm font-semibold shadow-[0_4px_0_#1e40af] active:translate-y-1 active:shadow-[0_2px_0_#1e40af] transition-all">
          Press me
        </button>
        <button className="px-5 h-10 rounded-md bg-gradient-to-b from-emerald-400 to-emerald-600 text-white text-sm font-bold border border-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_0_rgba(6,78,59,0.5)] active:translate-y-1 transition-all">
          Buy now
        </button>
      </Frame>

      <Frame label="8. Neumorphism" note="背景同色 + 凹凸シャドウ">
        <div
          className="flex gap-3 w-full"
          style={{ background: "#e0e5ec", borderRadius: 8, padding: 16 }}
        >
          <button
            className="px-5 h-10 rounded-xl text-sm font-medium text-zinc-700"
            style={{
              background: "#e0e5ec",
              boxShadow: "5px 5px 10px #b8bcc2, -5px -5px 10px #ffffff",
            }}
          >
            Soft button
          </button>
          <button
            className="px-5 h-10 rounded-xl text-sm font-medium text-zinc-700"
            style={{
              background: "#e0e5ec",
              boxShadow: "inset 5px 5px 10px #b8bcc2, inset -5px -5px 10px #ffffff",
            }}
          >
            Pressed
          </button>
        </div>
      </Frame>

      <Frame label="9. Glass" note="半透明 + backdrop-blur。背景があると映える">
        <div
          className="rounded-md p-4 flex gap-3 w-full"
          style={{
            background: "linear-gradient(135deg, #6366f1, #ec4899)",
          }}
        >
          <button className="px-4 h-9 rounded-md bg-white/20 backdrop-blur border border-white/40 text-white text-sm font-medium hover:bg-white/30">
            Glass
          </button>
          <button className="px-4 h-9 rounded-md bg-white/95 backdrop-blur text-zinc-900 text-sm font-medium">
            Solid on glass
          </button>
        </div>
      </Frame>

      <Frame label="10. Icon only" note="アイコンだけ。ツールバー・アクション列">
        <button className="w-9 h-9 rounded-md bg-zinc-900 text-white flex items-center justify-center">
          <Plus className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-md border border-zinc-300 text-zinc-700 flex items-center justify-center hover:bg-zinc-50">
          <Heart className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center hover:bg-rose-200">
          <Heart className="w-4 h-4 fill-current" />
        </button>
        <button className="w-9 h-9 rounded-md hover:bg-zinc-100 text-zinc-500 flex items-center justify-center">
          <Trash2 className="w-4 h-4" />
        </button>
      </Frame>

      <Frame label="11. FAB (Floating Action)" note="画面右下の常駐 CTA。新規作成">
        <button className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition">
          <Plus className="w-6 h-6" />
        </button>
        <button className="h-14 px-5 rounded-full bg-blue-600 text-white flex items-center gap-2 shadow-xl hover:shadow-2xl transition font-medium">
          <Plus className="w-5 h-5" />
          作成
        </button>
        <button className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition">
          <Sparkles className="w-5 h-5" />
        </button>
      </Frame>

      <Frame label="12. With icon (leading / trailing)" note="動きを示す矢印 / 補助アイコン">
        <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium">
          <Download className="w-4 h-4" />
          ダウンロード
        </button>
        <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-blue-600 text-white text-sm font-medium">
          続ける
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-emerald-600 text-white text-sm font-medium">
          <Send className="w-3.5 h-3.5" />
          送信
        </button>
      </Frame>

      <Frame label="13. Split button" note="メイン + ドロップダウン">
        <div className="inline-flex">
          <button className="px-4 h-9 rounded-l-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800">
            保存
          </button>
          <button className="w-8 h-9 rounded-r-md bg-zinc-900 text-white border-l border-zinc-700 flex items-center justify-center hover:bg-zinc-800">
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </Frame>

      <Frame label="14. Segmented toggle group" note="排他的な選択">
        <ToggleGroup />
      </Frame>

      <Frame label="15. Loading" note="非同期処理中">
        <LoadingBtn />
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 h-9 rounded-md border border-zinc-300 text-zinc-700 text-sm font-medium"
        >
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          読み込み中
        </button>
      </Frame>

      <Frame label="16. Sizes" note="xs / sm / md / lg / xl">
        <button className="px-2 h-6 rounded text-xs font-medium bg-zinc-900 text-white">xs</button>
        <button className="px-3 h-7 rounded-md text-xs font-medium bg-zinc-900 text-white">
          sm
        </button>
        <button className="px-4 h-9 rounded-md text-sm font-medium bg-zinc-900 text-white">
          md
        </button>
        <button className="px-5 h-10 rounded-md text-sm font-semibold bg-zinc-900 text-white">
          lg
        </button>
        <button className="px-6 h-12 rounded-md text-base font-semibold bg-zinc-900 text-white">
          xl
        </button>
      </Frame>

      <Frame label="17. Disabled" note="操作不可">
        <button
          disabled
          className="px-4 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium opacity-40 cursor-not-allowed"
        >
          無効
        </button>
        <button
          disabled
          className="px-4 h-9 rounded-md border border-zinc-300 text-zinc-400 text-sm font-medium cursor-not-allowed"
        >
          無効
        </button>
      </Frame>
    </div>
  );
}
