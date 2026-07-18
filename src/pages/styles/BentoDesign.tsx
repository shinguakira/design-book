import { TrendingUp, Users, Eye, Sparkles } from "lucide-react";
import { StyleDoc } from "../_shared/StyleDoc";

export default function BentoDesign() {
  return (
    <StyleDoc
      intro="弁当箱のように大小のセル (タイル) を組み合わせる非対称グリッド。Apple WWDC 2023 で大々的に採用されて以降、SaaS LP・ダッシュボードの新定番。情報の重み付けを直感的に伝えられる。"
      pros={[
        "主役と脇役の階層が一目で伝わる",
        "余白で読みやすさを保ちつつ情報量を上げられる",
        "スマホでも縦に積めば破綻しない",
      ]}
      cons={[
        "コンテンツが揃わないと「歯抜け」に見える",
        "グリッドの設計に手間がかかる",
        "全部のタイルが等しく重要に見えるのは難しい",
      ]}
      example={
        <div className="p-6 bg-zinc-100 rounded-md">
          <div
            className="grid grid-cols-4 grid-rows-3 gap-3 max-w-2xl mx-auto"
            style={{ aspectRatio: "4/3" }}
          >
            <div className="col-span-2 row-span-2 rounded-3xl bg-white p-5 flex flex-col justify-between shadow-sm">
              <div className="text-xs text-zinc-500">Active users</div>
              <div>
                <div className="text-4xl font-bold tabular-nums">12,340</div>
                <div className="text-xs text-emerald-600 inline-flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +12% 先月
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-blue-600 text-white p-4 flex flex-col justify-between">
              <Users className="w-5 h-5" />
              <div>
                <div className="text-2xl font-bold">+28%</div>
                <div className="text-[10px] opacity-80">Growth</div>
              </div>
            </div>
            <div className="rounded-3xl bg-amber-100 text-amber-900 p-4 flex flex-col justify-between">
              <Eye className="w-5 h-5" />
              <div>
                <div className="text-2xl font-bold">183K</div>
                <div className="text-[10px] opacity-70">Views</div>
              </div>
            </div>
            <div className="col-span-2 rounded-3xl bg-gradient-to-br from-violet-600 to-pink-600 text-white p-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 shrink-0" />
              <div>
                <div className="font-semibold">AI が今週のハイライトをまとめました</div>
                <div className="text-[10px] opacity-80">5 分前</div>
              </div>
            </div>
            <div className="col-span-4 rounded-3xl bg-zinc-900 text-white p-4 flex items-center justify-between">
              <div>
                <div className="text-xs opacity-60">今日の目標まで</div>
                <div className="text-xl font-bold">あと 320 件</div>
              </div>
              <div className="text-[10px] opacity-50">→ 詳細</div>
            </div>
          </div>
        </div>
      }
    />
  );
}
