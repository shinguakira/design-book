import { lazy, type ComponentType } from 'react'

export type Entry = {
  slug: string
  title: string
  description?: string
  Component: ComponentType
}

export type Section = {
  id: string
  label: string
  entries: Entry[]
}

const lz = (loader: () => Promise<{ default: ComponentType }>) => lazy(loader)

export const sections: Section[] = [
  {
    id: 'form',
    label: 'Form',
    entries: [
      {
        slug: 'button',
        title: 'Button',
        description: 'クリック可能なアクション。variant 4種。',
        Component: lz(() => import('./pages/components/ButtonShowcase')),
      },
      {
        slug: 'input',
        title: 'Input',
        description: '1行テキスト入力。label/hint/error付き。',
        Component: lz(() => import('./pages/components/InputShowcase')),
      },
      {
        slug: 'textarea',
        title: 'Textarea',
        description: '複数行のテキスト入力。',
        Component: lz(() => import('./pages/components/TextareaShowcase')),
      },
      {
        slug: 'select',
        title: 'Select',
        description: 'プルダウンで選択。',
        Component: lz(() => import('./pages/components/SelectShowcase')),
      },
      {
        slug: 'checkbox',
        title: 'Checkbox',
        description: '複数選択のチェック。',
        Component: lz(() => import('./pages/components/CheckboxShowcase')),
      },
      {
        slug: 'radio',
        title: 'Radio',
        description: '排他選択のラジオ。',
        Component: lz(() => import('./pages/components/RadioShowcase')),
      },
      {
        slug: 'switch',
        title: 'Switch',
        description: 'オン/オフ切替トグル。',
        Component: lz(() => import('./pages/components/SwitchShowcase')),
      },
      {
        slug: 'file-upload',
        title: 'File Upload',
        description: 'ドロップ可能なファイル入力。',
        Component: lz(() => import('./pages/components/FileUploadShowcase')),
      },
    ],
  },
  {
    id: 'display',
    label: 'Display',
    entries: [
      {
        slug: 'badge',
        title: 'Badge',
        description: 'ステータスやカウントを小さく表示。',
        Component: lz(() => import('./pages/components/BadgeShowcase')),
      },
      {
        slug: 'avatar',
        title: 'Avatar',
        description: 'ユーザーアイコン。イニシャル or 画像。',
        Component: lz(() => import('./pages/components/AvatarShowcase')),
      },
      {
        slug: 'chip',
        title: 'Chip',
        description: 'タグ。削除可能オプションあり。',
        Component: lz(() => import('./pages/components/ChipShowcase')),
      },
      {
        slug: 'card',
        title: 'Card',
        description: 'コンテンツのコンテナ。',
        Component: lz(() => import('./pages/components/CardShowcase')),
      },
      {
        slug: 'list',
        title: 'List',
        description: '行ごとのリスト。設定画面など。',
        Component: lz(() => import('./pages/components/ListShowcase')),
      },
      {
        slug: 'table',
        title: 'Table',
        description: 'データテーブル。',
        Component: lz(() => import('./pages/components/TableShowcase')),
      },
      {
        slug: 'divider',
        title: 'Divider',
        description: '区切り線。ラベル付きも。',
        Component: lz(() => import('./pages/components/DividerShowcase')),
      },
      {
        slug: 'progress-bar',
        title: 'Progress Bar',
        description: '進捗の線形バー。',
        Component: lz(() => import('./pages/components/ProgressBarShowcase')),
      },
      {
        slug: 'spinner',
        title: 'Spinner',
        description: 'ローディング用のスピナー。',
        Component: lz(() => import('./pages/components/SpinnerShowcase')),
      },
      {
        slug: 'skeleton',
        title: 'Skeleton',
        description: 'ローディング中のプレースホルダ。',
        Component: lz(() => import('./pages/components/SkeletonShowcase')),
      },
      {
        slug: 'empty-state',
        title: 'Empty State',
        description: '空状態の表示。',
        Component: lz(() => import('./pages/components/EmptyStateShowcase')),
      },
    ],
  },
  {
    id: 'overlay',
    label: 'Overlay & Feedback',
    entries: [
      {
        slug: 'dialog',
        title: 'Dialog',
        description: 'モーダルダイアログ。',
        Component: lz(() => import('./pages/components/DialogShowcase')),
      },
      {
        slug: 'drawer',
        title: 'Drawer',
        description: '横からスライドインするパネル。',
        Component: lz(() => import('./pages/components/DrawerShowcase')),
      },
      {
        slug: 'tooltip',
        title: 'Tooltip',
        description: 'ホバーで出る補足。',
        Component: lz(() => import('./pages/components/TooltipShowcase')),
      },
      {
        slug: 'popover',
        title: 'Popover',
        description: 'クリックで出る吹き出しパネル。',
        Component: lz(() => import('./pages/components/PopoverShowcase')),
      },
      {
        slug: 'menu',
        title: 'Menu',
        description: 'ドロップダウンメニュー。',
        Component: lz(() => import('./pages/components/MenuShowcase')),
      },
      {
        slug: 'snackbar',
        title: 'Snackbar',
        description: '画面下の一時通知。',
        Component: lz(() => import('./pages/components/SnackbarShowcase')),
      },
      {
        slug: 'alert',
        title: 'Alert',
        description: 'インライン警告。情報/成功/警告/エラー。',
        Component: lz(() => import('./pages/components/AlertShowcase')),
      },
      {
        slug: 'banner',
        title: 'Banner',
        description: '画面上部の帯バナー。',
        Component: lz(() => import('./pages/components/BannerShowcase')),
      },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    entries: [
      {
        slug: 'tabs',
        title: 'Tabs',
        description: 'タブ切り替え。',
        Component: lz(() => import('./pages/components/TabsShowcase')),
      },
      {
        slug: 'accordion',
        title: 'Accordion',
        description: '開閉できるリスト。FAQなど。',
        Component: lz(() => import('./pages/components/AccordionShowcase')),
      },
      {
        slug: 'breadcrumb',
        title: 'Breadcrumb',
        description: 'パンくず。',
        Component: lz(() => import('./pages/components/BreadcrumbShowcase')),
      },
      {
        slug: 'pagination',
        title: 'Pagination',
        description: 'ページネーション。',
        Component: lz(() => import('./pages/components/PaginationShowcase')),
      },
    ],
  },
  {
    id: 'styles',
    label: 'Design Styles',
    entries: [
      {
        slug: 'flat',
        title: 'Flat Design',
        description: '影なし・純色・タイポ重視のミニマル。現代Webの基本。',
        Component: lz(() => import('./pages/styles/FlatDesign')),
      },
      {
        slug: 'material',
        title: 'Material Design',
        description: 'Google発。紙(material)の概念とelevation影。',
        Component: lz(() => import('./pages/styles/MaterialDesign')),
      },
      {
        slug: 'neumorphism',
        title: 'Neumorphism',
        description: '同色の凸凹を影で表現。柔らかい質感。',
        Component: lz(() => import('./pages/styles/Neumorphism')),
      },
      {
        slug: 'glassmorphism',
        title: 'Glassmorphism',
        description: '半透明 + 背景ブラーですりガラス風に。',
        Component: lz(() => import('./pages/styles/Glassmorphism')),
      },
      {
        slug: 'skeuomorphism',
        title: 'Skeuomorphism',
        description: '現実の質感(革・木目・3Dボタン)を模倣。',
        Component: lz(() => import('./pages/styles/Skeuomorphism')),
      },
      {
        slug: 'brutalism',
        title: 'Brutalism',
        description: '太枠・等幅・ハードシャドウ。反デザイン的。',
        Component: lz(() => import('./pages/styles/Brutalism')),
      },
      {
        slug: 'claymorphism',
        title: 'Claymorphism',
        description: '粘土風のふっくらした3D。パステルと相性○。',
        Component: lz(() => import('./pages/styles/Claymorphism')),
      },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    entries: [
      {
        slug: 'palette',
        title: 'Color Palette',
        description: 'Tailwind標準パレットの全色相 × 11段階。',
        Component: lz(() => import('./pages/color/ColorPalette')),
      },
      {
        slug: 'sixty-thirty-ten',
        title: '60-30-10 Rule',
        description: 'メイン/サブ/アクセントの黄金比。',
        Component: lz(() => import('./pages/color/SixtyThirtyTen')),
      },
      {
        slug: 'harmony',
        title: 'Color Harmony',
        description: '補色・類似色・三角配色などの定石。',
        Component: lz(() => import('./pages/color/ColorHarmony')),
      },
      {
        slug: 'tints-shades',
        title: 'Tints & Shades',
        description: '1色から派生色を作る方法。',
        Component: lz(() => import('./pages/color/TintsAndShades')),
      },
      {
        slug: 'contrast',
        title: 'Contrast & A11y',
        description: 'WCAGコントラスト比とAA/AAA判定。',
        Component: lz(() => import('./pages/color/Contrast')),
      },
      {
        slug: 'color-blindness',
        title: 'Color Blindness',
        description: '色覚特性。男性の8%が該当。実際の見え方をSVGで再現。',
        Component: lz(() => import('./pages/color/ColorBlindness')),
      },
      {
        slug: 'cultural-meaning',
        title: 'Cultural Meaning',
        description: '色の文化的意味。白=喪 (アジア)、白=純潔 (欧米) など。',
        Component: lz(() => import('./pages/color/CulturalMeaning')),
      },
      {
        slug: 'inclusive-design',
        title: 'Inclusive Design',
        description: '低視力・光過敏・加齢など、特定の人への配慮。',
        Component: lz(() => import('./pages/color/InclusiveDesign')),
      },
    ],
  },
  {
    id: 'animation',
    label: 'Animation',
    entries: [
      {
        slug: 'loops',
        title: 'Loops',
        description: 'pulse / spin / bounce / ping など無限ループ系。',
        Component: lz(() => import('./pages/animation/Loops')),
      },
      {
        slug: 'loading',
        title: 'Loading',
        description: 'スピナー・ドット・shimmer・indeterminate進捗。',
        Component: lz(() => import('./pages/animation/Loading')),
      },
      {
        slug: 'entrance',
        title: 'Entrance',
        description: 'フェード/スライド/スケール in。stagger も。',
        Component: lz(() => import('./pages/animation/Entrance')),
      },
      {
        slug: 'attention',
        title: 'Attention',
        description: 'shake・wiggle・heartbeat・glow など注意喚起。',
        Component: lz(() => import('./pages/animation/Attention')),
      },
      {
        slug: 'hover',
        title: 'Hover Effects',
        description: 'lift・scale・tilt・underline grow など。',
        Component: lz(() => import('./pages/animation/Hover')),
      },
      {
        slug: 'micro-interactions',
        title: 'Micro-interactions',
        description: 'いいね・コピー・トグル・カウンタなど小さな反応。',
        Component: lz(() => import('./pages/animation/MicroInteractions')),
      },
      {
        slug: 'marquee',
        title: 'Marquee',
        description: '横スクロールするテキスト/ロゴ。両端フェード付きも。',
        Component: lz(() => import('./pages/animation/Marquee')),
      },
      {
        slug: 'easing',
        title: 'Easing Curves',
        description: 'linear/ease-in/out/in-out/spring の比較。',
        Component: lz(() => import('./pages/animation/Easing')),
      },
    ],
  },
  {
    id: 'scenarios',
    label: 'Scenarios',
    entries: [
      {
        slug: 'multi-tab-errors',
        title: 'Multi-tab Form Errors',
        description: '複数タブのフォームでエラーを伝える6パターンを切替比較。',
        Component: lz(() => import('./pages/scenarios/MultiTabErrors')),
      },
    ],
  },
  {
    id: 'screens',
    label: 'Screens',
    entries: [
      {
        slug: 'login',
        title: 'Login',
        description: 'ログイン画面のデザイン案。',
        Component: lz(() => import('./pages/screens/LoginScreen')),
      },
    ],
  },
  {
    id: 'ideas',
    label: 'Ideas',
    entries: [
      {
        slug: 'gradient-card',
        title: 'Gradient Card',
        description: 'グラデーション背景のカード案。',
        Component: lz(() => import('./pages/ideas/GradientCard')),
      },
    ],
  },
]

export const flatEntries = sections.flatMap((s) =>
  s.entries.map((e) => ({ ...e, sectionId: s.id, sectionLabel: s.label })),
)
