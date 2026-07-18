import type { LucideIcon } from "lucide-react";
import {
  Pencil,
  LayoutGrid,
  MessageSquare,
  Compass,
  Palette,
  Droplet,
  Sparkles,
  Clapperboard,
  Monitor,
  Lightbulb,
  Package,
  MessageCircle,
  PanelsTopLeft,
  FolderTree,
  Layers,
} from "lucide-react";

export type SectionMeta = {
  Icon: LucideIcon;
  gradient: string;
  pill: string;
  bar: string;
  hover: string;
  tagline: string;
};

const SECTION_META: Record<string, SectionMeta> = {
  form: {
    Icon: Pencil,
    gradient: "from-blue-500 to-cyan-500",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    bar: "bg-blue-500",
    hover: "hover:bg-blue-50/60",
    tagline: "テキスト・選択・ファイル — ユーザー入力",
  },
  display: {
    Icon: LayoutGrid,
    gradient: "from-emerald-500 to-teal-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-500",
    hover: "hover:bg-emerald-50/60",
    tagline: "情報を見せる — ラベル・カード・テーブル",
  },
  overlay: {
    Icon: MessageSquare,
    gradient: "from-violet-500 to-purple-500",
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    bar: "bg-violet-500",
    hover: "hover:bg-violet-50/60",
    tagline: "画面の上に重ねる — ダイアログ・通知・吹き出し",
  },
  navigation: {
    Icon: Compass,
    gradient: "from-amber-500 to-orange-500",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    bar: "bg-amber-500",
    hover: "hover:bg-amber-50/60",
    tagline: "移動と切り替え — タブ・パンくず・ページネーション",
  },
  files: {
    Icon: FolderTree,
    gradient: "from-yellow-500 to-amber-600",
    pill: "bg-yellow-50 text-yellow-800 border-yellow-200",
    bar: "bg-yellow-500",
    hover: "hover:bg-yellow-50/60",
    tagline: "パス・フォルダ・アップロード — ファイル種別非依存",
  },
  styles: {
    Icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    pill: "bg-pink-50 text-pink-700 border-pink-200",
    bar: "bg-pink-500",
    hover: "hover:bg-pink-50/60",
    tagline: "デザインスタイルの比較 — Flat・Material・Glassmorphism他",
  },
  layout: {
    Icon: PanelsTopLeft,
    gradient: "from-slate-500 to-zinc-700",
    pill: "bg-slate-50 text-slate-700 border-slate-200",
    bar: "bg-slate-500",
    hover: "hover:bg-slate-50/60",
    tagline: "ヘッダー・フッター・詳細パネルの開き方",
  },
  color: {
    Icon: Droplet,
    gradient: "from-fuchsia-500 via-purple-500 to-blue-500",
    pill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    bar: "bg-fuchsia-500",
    hover: "hover:bg-fuchsia-50/60",
    tagline: "配色とアクセシビリティ — パレット・コントラスト・色覚特性",
  },
  animation: {
    Icon: Sparkles,
    gradient: "from-cyan-500 to-sky-500",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    bar: "bg-cyan-500",
    hover: "hover:bg-cyan-50/60",
    tagline: "動きの引き出し — pulse・shake・stagger",
  },
  scenarios: {
    Icon: Clapperboard,
    gradient: "from-orange-500 to-red-500",
    pill: "bg-orange-50 text-orange-700 border-orange-200",
    bar: "bg-orange-500",
    hover: "hover:bg-orange-50/60",
    tagline: "実プロダクトのUXパターン",
  },
  messaging: {
    Icon: MessageCircle,
    gradient: "from-sky-500 to-blue-600",
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    bar: "bg-sky-500",
    hover: "hover:bg-sky-50/60",
    tagline: "チャット・AI入力・音声・添付ファイル",
  },
  screens: {
    Icon: Monitor,
    gradient: "from-indigo-500 to-blue-600",
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
    bar: "bg-indigo-500",
    hover: "hover:bg-indigo-50/60",
    tagline: "ページ単位のデザイン案",
  },
  ideas: {
    Icon: Lightbulb,
    gradient: "from-yellow-400 to-amber-500",
    pill: "bg-yellow-50 text-yellow-800 border-yellow-200",
    bar: "bg-yellow-400",
    hover: "hover:bg-yellow-50/60",
    tagline: "溜まったアイデアのメモ",
  },
};

const DEFAULT_META: SectionMeta = {
  Icon: Package,
  gradient: "from-zinc-500 to-zinc-700",
  pill: "bg-zinc-50 text-zinc-700 border-zinc-200",
  bar: "bg-zinc-500",
  hover: "hover:bg-zinc-50",
  tagline: "",
};

export const metaOf = (id: string): SectionMeta => SECTION_META[id] ?? DEFAULT_META;

/* ─── 軸 (タブ) → セクション群 のグルーピング ─── */
export type ViewGroup = {
  id: string;
  label: string;
  Icon: LucideIcon;
  gradient: string;
  pill: string;
  sectionIds: string[];
};

export const VIEW_GROUPS: ViewGroup[] = [
  {
    id: "components",
    label: "Components",
    Icon: Layers,
    gradient: "from-blue-500 to-emerald-500",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    sectionIds: ["form", "display", "overlay", "navigation", "files", "layout", "ideas"],
  },
  {
    id: "design",
    label: "Design",
    Icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    pill: "bg-pink-50 text-pink-700 border-pink-200",
    sectionIds: ["styles"],
  },
  {
    id: "color",
    label: "Color",
    Icon: Droplet,
    gradient: "from-fuchsia-500 via-purple-500 to-blue-500",
    pill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    sectionIds: ["color"],
  },
  {
    id: "animation",
    label: "Animation",
    Icon: Sparkles,
    gradient: "from-cyan-500 to-sky-500",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    sectionIds: ["animation"],
  },
  {
    id: "scenarios",
    label: "Scenarios",
    Icon: Clapperboard,
    gradient: "from-orange-500 to-red-500",
    pill: "bg-orange-50 text-orange-700 border-orange-200",
    sectionIds: ["scenarios", "messaging"],
  },
];
