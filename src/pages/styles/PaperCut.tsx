import { StyleDoc } from "../_shared/StyleDoc";

export default function PaperCut() {
  return (
    <StyleDoc
      intro="切り絵 / 折り紙のように紙を重ねた層感を表現するスタイル。柔らかい影 + 重なる色面 + 切り抜き感。Google Doodle や絵本系アプリ、教育コンテンツでよく使われる。Material Design の「elevation」概念の源流の一つ。"
      pros={[
        "温かみ・親しみ",
        "層で情報の前後関係を表現できる",
        "幼児向け・教育・絵本アプリと相性",
      ]}
      cons={[
        "プロフェッショナル感は出ない",
        "影の管理が雑だと安っぽい",
        "色数を絞らないと統一感が崩れる",
      ]}
      example={
        <div className="p-10 rounded-md" style={{ background: "#fef3c7" }}>
          <div className="relative max-w-xs mx-auto" style={{ height: 200 }}>
            <div
              className="absolute rounded-full"
              style={{
                width: 160,
                height: 160,
                background: "#fcd34d",
                top: 20,
                left: 20,
                boxShadow: "4px 4px 0 rgba(146, 64, 14, 0.15)",
              }}
            />
            <div
              className="absolute rounded-3xl"
              style={{
                width: 140,
                height: 90,
                background: "#3a7a72",
                top: 80,
                left: 40,
                boxShadow: "4px 4px 0 rgba(15, 50, 45, 0.25)",
                clipPath:
                  "polygon(0% 30%, 8% 0%, 30% 25%, 55% 5%, 80% 30%, 100% 15%, 100% 100%, 0% 100%)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 30,
                height: 80,
                background: "#dc2626",
                top: 90,
                left: 130,
                clipPath: "polygon(50% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
                boxShadow: "3px 3px 0 rgba(127, 29, 29, 0.3)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 25,
                height: 25,
                background: "#fff",
                top: 70,
                left: 175,
                borderRadius: "50%",
                boxShadow: "3px 3px 0 rgba(0,0,0,0.1)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 50,
                height: 12,
                background: "#fff",
                top: 65,
                left: 145,
                borderRadius: 8,
                boxShadow: "3px 3px 0 rgba(0,0,0,0.08)",
              }}
            />
          </div>
          <div
            className="text-center mt-2 font-bold text-2xl"
            style={{ color: "#7c2d12", fontFamily: "serif" }}
          >
            Hello, Spring!
          </div>
        </div>
      }
    />
  );
}
