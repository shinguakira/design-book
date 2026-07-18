import { StyleDoc } from "../_shared/StyleDoc";

export default function Isometric() {
  return (
    <StyleDoc
      intro="30度の等角投影で擬似3D表現する手法。ゲーム (SimCity / Habbo / モノポリー) や インフォグラフィック / IT イラスト (Atlassian / Slack illustrations) で多用。立体感が出るのに平面なので軽量。"
      pros={[
        "空間関係が直感的に伝わる",
        "平面で完結するので軽量・実装しやすい",
        "インフォグラフィック・SaaS 説明と相性◎",
      ]}
      cons={[
        "視差が必要なリッチ表現には不向き",
        "装飾過剰だと「コーポレートクリップアート」化",
        "日本人ユーザーには「メルカリ風」と即連想される",
      ]}
      example={
        <div className="p-8 rounded-md" style={{ background: "#f1f5f9" }}>
          <svg
            viewBox="0 0 320 240"
            className="w-full max-w-md mx-auto"
            style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}
          >
            {/* base block */}
            <polygon points="40,180 160,240 280,180 160,120" fill="#94a3b8" />
            <polygon points="40,180 40,200 160,260 160,240" fill="#64748b" />
            <polygon points="280,180 280,200 160,260 160,240" fill="#475569" />

            {/* server tower 1 */}
            <polygon points="70,150 70,90 130,120 130,180" fill="#3b82f6" />
            <polygon points="70,90 130,60 190,90 130,120" fill="#60a5fa" />
            <polygon points="130,120 190,90 190,150 130,180" fill="#1d4ed8" />
            <rect x="80" y="105" width="8" height="3" fill="#fff" opacity="0.9" />
            <rect x="80" y="115" width="8" height="3" fill="#fff" opacity="0.9" />
            <rect x="80" y="125" width="8" height="3" fill="#fff" opacity="0.9" />
            <rect x="80" y="135" width="8" height="3" fill="#fff" opacity="0.9" />

            {/* server tower 2 */}
            <polygon points="180,165 180,105 240,135 240,195" fill="#10b981" />
            <polygon points="180,105 240,75 280,90 240,135 240,135" fill="#34d399" />
            <polygon points="240,135 280,105 280,165 240,195" fill="#059669" />

            {/* cloud */}
            <ellipse
              cx="100"
              cy="50"
              rx="32"
              ry="14"
              fill="#fff"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <ellipse cx="80" cy="48" rx="14" ry="8" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="118" cy="46" rx="12" ry="8" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />

            {/* lines */}
            <line
              x1="100"
              y1="60"
              x2="100"
              y2="92"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
          <div className="text-center mt-4 text-xs text-zinc-500 font-mono">
            ISOMETRIC · 30°/30° projection
          </div>
        </div>
      }
    />
  );
}
