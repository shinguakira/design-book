![Tri-choice](docs/screenshots/06-tri-choice.png)

# Design Book

見比べて選べる、個人のデザイン見本帳。

## これは何か

デザインの引き出しは、頭の中では 3 個しか思い出せない。ページを開けば 20 個並んでいる — そういう外部記憶。
各項目は静止画ではなく実際に動く UI で、そのままクリック・入力・切り替えができる。

## 何が入っているか

| タブ | 中身 |
|---|---|
| **Components** | ボタン / 入力 / セレクト / タブ / モーダル / テーブル / チャート / マウスエフェクト …110 種 |
| **Design** | Flat / Material / Glassmorphism / Skeuomorphism / Brutalism / Bento / Y2K / Cyberpunk / Frutiger Aero など 32 種の様式 |
| **Color** | Tailwind パレット、60-30-10、コントラスト A11y、色覚特性、文化的意味 |
| **Animation** | ループ / ローディング / エントランス / ホバー / マイクロインタラクション / モーダル演出 |
| **Scenarios** | ログイン、複数タブでのエラー、3択セレクタ、PubMed 検索、日付入力 24種 …「使い所」から引ける集 |

## 使ってる場面

- **選択に迷ったとき** — 「並べ替え UI ってどんな見せ方があったっけ」を思い出す
- **参照したいとき** — 有名サイトのデザイン (Stripe / Linear / Notion / Apple 等) を並べて比較
- **説明したいとき** — 色覚特性の見え方や、コントラストの基準値をそのまま見せる
- **ハズし技を探したいとき** — Brutalism / Anti-design / Memphis を眺めて崩し方の下敷きにする

## もっと画面

### ホーム
5 軸それぞれの下に、大量のパターンが並ぶ。

![Home](docs/screenshots/01-home.png)

### Components — Select Options
ドロップダウンの 1 行スロット構成を 20 種、実際に選べる状態で。

![Select Options](docs/screenshots/02-components.png)

### Design — Famous Websites
12 社を雰囲気そのままで並べたショーケース。

![Famous Websites](docs/screenshots/03-styles.png)

### Color — 色覚特性
男性の約 8% が該当する見え方を SVG フィルタで再現。

![Color Blindness](docs/screenshots/04-color-blindness.png)

### Animation — Loops
pulse / spin / bounce / ping / wiggle / heartbeat / float / glow。ページを開くと全部同時に動く。

![Animation Loops](docs/screenshots/05-animation.png)

### Scenarios — 日付・時刻入力
表現 14 種 + シナリオ 10 種 (生年月日 / 予約 / 宿泊 / リマインダー / 定期 / 空き時間表 / 四半期 …)。

![Date & Time](docs/screenshots/07-date-time.png)

---

すべてのページに「気をつけること」「選ぶ基準」を末尾に付けているので、
そのパターンをどこで使うと死ぬか / どこで活きるかも一緒に持ち帰れる。
