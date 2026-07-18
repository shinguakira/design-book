import { Button } from "../../components/ui/Button";

export default function LoginScreen() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="min-h-[560px] grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-10 text-white">
          <div className="text-lg font-semibold">Acme</div>
          <div className="mt-auto pt-32">
            <div className="text-3xl font-semibold leading-tight">
              ようこそ、
              <br />
              Acme へ。
            </div>
            <p className="mt-3 text-sm text-zinc-300">チームのデザインアイデアを一箇所に。</p>
          </div>
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold">ログイン</h2>
          <p className="text-sm text-zinc-500 mt-1">アカウントにサインインしてください。</p>

          <form className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-zinc-600">メール</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-zinc-600">パスワード</span>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </label>

            <Button type="button" className="w-full">
              ログイン
            </Button>
            <Button type="button" variant="secondary" className="w-full">
              Googleで続ける
            </Button>

            <div className="text-center text-xs text-zinc-500 pt-2">
              アカウントがない方は{" "}
              <a className="underline" href="#">
                新規登録
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
