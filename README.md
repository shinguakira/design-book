# Design Book

自分用のデザイン置き場。Vite + React + TypeScript + Tailwind v4 + react-router。

## 使い方

```
npm install
npm run dev
```

## 追加方法

新しいコンポーネント/画面/アイデアを足すとき:

1. `src/pages/<section>/<Name>.tsx` を作る(`default export` のコンポーネント)
2. `src/registry.tsx` の対応する section に entry を追加

サイドバーとルーティングは registry から自動生成される。
