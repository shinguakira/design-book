import { useEffect, useMemo, useRef, useState } from "react";

type PatternId = "inline" | "snackbar" | "summary" | "badge" | "auto-switch" | "sticky";

const PATTERNS: { id: PatternId; label: string; description: string }[] = [
  {
    id: "inline",
    label: "Inline only",
    description: "フィールド直下にエラー文。タブ切替後だと気づけない。最低限の表示。",
  },
  {
    id: "snackbar",
    label: "Snackbar",
    description: "画面下に「3件のエラーがあります」と要約を出す。数秒で消える。",
  },
  {
    id: "summary",
    label: "Summary above",
    description: "タブ上にエラー一覧。クリックで該当タブ + フィールドにフォーカス。",
  },
  {
    id: "badge",
    label: "Tab badge",
    description: "エラーがあるタブに件数バッジ。離れていても件数が見える。",
  },
  {
    id: "auto-switch",
    label: "Auto-switch",
    description: "Submit時に最初のエラーがあるタブへ自動切替。",
  },
  {
    id: "sticky",
    label: "Sticky banner",
    description: "上部固定バナーでエラー要約。スクロールしても消えない。",
  },
];

const TABS = [
  { id: "account", label: "アカウント" },
  { id: "profile", label: "プロフィール" },
  { id: "notification", label: "通知" },
];

type Field = {
  id: string;
  tab: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  validate: (v: string) => string | null;
};

const FIELDS: Field[] = [
  {
    id: "email",
    tab: "account",
    label: "メールアドレス",
    type: "email",
    placeholder: "you@example.com",
    validate: (v) => (!v ? "必須項目です" : !v.includes("@") ? "形式が正しくありません" : null),
  },
  {
    id: "password",
    tab: "account",
    label: "パスワード",
    type: "password",
    placeholder: "8文字以上",
    validate: (v) => (!v ? "必須項目です" : v.length < 8 ? "8文字以上で入力してください" : null),
  },
  {
    id: "name",
    tab: "profile",
    label: "名前",
    type: "text",
    placeholder: "山田 太郎",
    validate: (v) => (!v ? "必須項目です" : null),
  },
  {
    id: "age",
    tab: "profile",
    label: "年齢",
    type: "number",
    placeholder: "18",
    validate: (v) =>
      !v
        ? "必須項目です"
        : isNaN(+v)
          ? "数値で入力してください"
          : +v < 18
            ? "18歳以上で利用できます"
            : null,
  },
  {
    id: "phone",
    tab: "notification",
    label: "電話番号",
    type: "tel",
    placeholder: "09012345678",
    validate: (v) => (!v ? "必須項目です" : !/^\d+$/.test(v) ? "数字のみで入力してください" : null),
  },
  {
    id: "notifyEmail",
    tab: "notification",
    label: "通知用メール",
    type: "email",
    placeholder: "notify@example.com",
    validate: (v) => (!v ? "必須項目です" : !v.includes("@") ? "形式が正しくありません" : null),
  },
];

export default function MultiTabErrors() {
  const [pattern, setPattern] = useState<PatternId>("badge");
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [activeTab, setActiveTab] = useState("account");
  const [shakeKey, setShakeKey] = useState(0);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    tone: "error" | "success";
    message: string;
  }>({ open: false, tone: "error", message: "" });
  const [stickyOpen, setStickyOpen] = useState(false);
  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!snackbar.open) return;
    const t = setTimeout(() => setSnackbar((s) => ({ ...s, open: false })), 3000);
    return () => clearTimeout(t);
  }, [snackbar.open, snackbar.message]);

  const errorList = useMemo(
    () =>
      FIELDS.filter((f) => errors[f.id]).map((f) => ({
        ...f,
        message: errors[f.id]!,
      })),
    [errors],
  );

  const errorCountByTab = useMemo(() => {
    const m: Record<string, number> = {};
    for (const e of errorList) m[e.tab] = (m[e.tab] ?? 0) + 1;
    return m;
  }, [errorList]);

  const reset = () => {
    setErrors({});
    setStickyOpen(false);
    setSnackbar({ open: false, tone: "error", message: "" });
  };

  const setValue = (id: string, v: string) => {
    setValues((vs) => ({ ...vs, [id]: v }));
    if (errors[id]) {
      setErrors((es) => ({ ...es, [id]: null }));
    }
  };

  const onSubmit = () => {
    const newErrors: Record<string, string | null> = {};
    for (const f of FIELDS) {
      newErrors[f.id] = f.validate(values[f.id] ?? "");
    }
    setErrors(newErrors);
    const list = FIELDS.filter((f) => newErrors[f.id]);
    setShakeKey((k) => k + 1);

    if (list.length === 0) {
      setSnackbar({ open: true, tone: "success", message: "保存しました" });
      setStickyOpen(false);
      return;
    }

    if (pattern === "snackbar") {
      setSnackbar({
        open: true,
        tone: "error",
        message: `${list.length}件のエラーがあります。確認してください。`,
      });
    }
    if (pattern === "auto-switch") {
      setActiveTab(list[0].tab);
    }
    if (pattern === "sticky") {
      setStickyOpen(true);
    }
  };

  const jumpToField = (id: string, tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      const el = fieldRefs.current[id];
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        複数タブに分かれたフォームで、Submit時にどう失敗を伝えるか。Inlineだけでは離れたタブの問題に気づけない。下のラジオでパターンを切替えて挙動を比較。
      </p>

      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          表示パターン
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PATTERNS.map((p) => (
            <label
              key={p.id}
              className={`flex items-start gap-3 px-3 py-2 rounded-md border cursor-pointer transition ${
                pattern === p.id ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <input
                type="radio"
                name="pattern"
                checked={pattern === p.id}
                onChange={() => {
                  setPattern(p.id);
                  reset();
                }}
                className="mt-1 accent-zinc-900"
              />
              <div className="flex-1">
                <div className="text-sm font-medium">{p.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{p.description}</div>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white overflow-hidden relative">
        {pattern === "sticky" && stickyOpen && errorList.length > 0 && (
          <div className="sticky top-0 z-10 bg-red-600 text-white px-5 py-2.5 flex items-center justify-between text-sm">
            <div>
              <b>{errorList.length}件のエラー</b>:{" "}
              {errorList
                .slice(0, 2)
                .map((e) => e.label)
                .join("、")}
              {errorList.length > 2 && ` 他${errorList.length - 2}件`}
            </div>
            <button
              type="button"
              onClick={() => setStickyOpen(false)}
              className="opacity-80 hover:opacity-100"
            >
              ×
            </button>
          </div>
        )}

        {pattern === "summary" && errorList.length > 0 && (
          <div className="border-b border-red-200 bg-red-50 px-5 py-4">
            <div className="text-sm font-semibold text-red-900 mb-2">
              {errorList.length}件のエラーがあります
            </div>
            <ul className="text-sm space-y-1">
              {errorList.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => jumpToField(e.id, e.tab)}
                    className="text-red-700 hover:underline text-left"
                  >
                    <span className="font-medium">{e.label}</span>{" "}
                    <span className="text-red-600">— {e.message}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex border-b border-zinc-200">
          {TABS.map((t) => {
            const count = errorCountByTab[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`relative px-4 py-3 text-sm font-medium border-b-2 -mb-px transition ${
                  activeTab === t.id
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-500 hover:text-zinc-700"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {t.label}
                  {pattern === "badge" && count > 0 && (
                    <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-semibold">
                      {count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div key={`${activeTab}-${shakeKey}`} className="p-6 space-y-4">
          {FIELDS.filter((f) => f.tab === activeTab).map((f) => {
            const err = errors[f.id];
            return (
              <div key={f.id}>
                <label className="block text-xs font-medium text-zinc-600 mb-1">{f.label}</label>
                <input
                  ref={(el) => {
                    fieldRefs.current[f.id] = el;
                  }}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={values[f.id] ?? ""}
                  onChange={(e) => setValue(f.id, e.target.value)}
                  className={`block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    err
                      ? "border-red-500 focus:ring-red-500 animate-shake"
                      : "border-zinc-300 focus:ring-zinc-900"
                  }`}
                />
                {err && <div className="mt-1 text-xs text-red-600">{err}</div>}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            全タブ合計: {FIELDS.length}項目 / 必須エラー: {errorList.length}件
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reset}
              className="px-3 h-9 rounded-md border border-zinc-300 text-sm font-medium hover:bg-white"
            >
              リセット
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="px-4 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800"
            >
              保存
            </button>
          </div>
        </div>
      </section>

      {snackbar.open && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center z-50">
          <div
            className={`pointer-events-auto rounded-md px-4 py-2.5 text-sm shadow-lg ${
              snackbar.tone === "error" ? "bg-red-600 text-white" : "bg-emerald-600 text-white"
            }`}
          >
            {snackbar.message}
          </div>
        </div>
      )}

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          使い分けの目安
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-500">
              <tr>
                <th className="text-left font-medium px-4 py-2">パターン</th>
                <th className="text-left font-medium px-4 py-2">向いてる場面</th>
                <th className="text-left font-medium px-4 py-2">注意点</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="px-4 py-2 font-medium">Inline only</td>
                <td className="px-4 py-2 text-zinc-700">単一タブ・短いフォーム</td>
                <td className="px-4 py-2 text-zinc-600">複数タブには不十分</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Snackbar</td>
                <td className="px-4 py-2 text-zinc-700">エラー件数だけ伝えたい場合</td>
                <td className="px-4 py-2 text-zinc-600">数秒で消えるので詳細は別途必要</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Summary above</td>
                <td className="px-4 py-2 text-zinc-700">長いフォーム・全体把握させたい</td>
                <td className="px-4 py-2 text-zinc-600">エラーが多いと上部が長くなる</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Tab badge</td>
                <td className="px-4 py-2 text-zinc-700">タブ移動が頻繁・長期間編集</td>
                <td className="px-4 py-2 text-zinc-600">バッジだけだと初見では気付かれにくい</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Auto-switch</td>
                <td className="px-4 py-2 text-zinc-700">
                  「Submitが進まない」理由をすぐ見せたい時
                </td>
                <td className="px-4 py-2 text-zinc-600">ユーザーの操作を奪うので嫌がる人も</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Sticky banner</td>
                <td className="px-4 py-2 text-zinc-700">スクロールが必要な長いフォーム</td>
                <td className="px-4 py-2 text-zinc-600">本文の表示領域を恒常的に削る</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">合わせ技 (実プロダクトの定番)</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Tab badge + Auto-switch</b> —
            バッジで全体把握させつつ、Submit時は最初のエラーまで案内
          </li>
          <li>
            <b>Tab badge + Summary above</b> — Notion / Linear などで多用される万能パターン
          </li>
          <li>
            <b>Snackbar + Inline</b> — 軽量なフォームでサクッと知らせる
          </li>
          <li>
            <b>Real-time validation</b> — 入力中に検証することでSubmit時のエラーを減らす
            (このページでも入力で消える)
          </li>
        </ul>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-700">
        <div className="font-semibold mb-2">その他のバリエーション</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Tab自体を赤く塗る</b> — バッジより目立つが、押下可否との区別がつきにくい
          </li>
          <li>
            <b>タブ + tooltip</b> — エラーがあるタブに hover でエラー詳細
          </li>
          <li>
            <b>Toast stack</b> — エラーごとに個別Toastを積む (件数多いとうるさい)
          </li>
          <li>
            <b>Confirm dialog on leave</b> — エラーありで別タブへ移ろうとした時に警告
          </li>
          <li>
            <b>Save 失敗時のみ強調</b> — 編集中はinlineのみ、Submit失敗時に summary/banner 出す
          </li>
          <li>
            <b>ヘッダーに件数</b> — タブよりさらに上の画面ヘッダーにエラー件数を出す
            (ダッシュボード型)
          </li>
        </ul>
      </section>
    </div>
  );
}
