# Agent guidelines for `design-book`

## アイコン

- **絵文字 (Unicode emoji) は原則禁止。** UI上に出すアイコンは `lucide-react` のSVGアイコンを使う。
- 例外: 「絵文字そのものを題材にする」場合のみ可。たとえば「絵文字ピッカー」の実装デモなど、絵文字を主役にしたい時。
- 文字記号 (`×` `↑` `›` `‹` `⌄` `∅` `✓` `✗` `＋` など) は絵文字ではないので、装飾用途では引き続き使ってよい。ただし意味を持たせたい時 (close ボタン、open/close 状態など) はSVGアイコンの方が見栄えがいい場合が多い。

### 使い方の目安
```tsx
import { Bell, Heart, Search } from 'lucide-react'

<Bell className="w-4 h-4 text-zinc-500" />
```
サイズは Tailwind の `w-* h-*` で指定。色は `text-*` で継承。

## コミット

- `nodeなどに対する破壊操作はしない` の原則。
- 余計なファイルをまとめてコミットしない (`git add .` 禁止、ファイル名で指定)。
- 自動生成物 (`dist/`, `node_modules/`) は `.gitignore` 済み。
