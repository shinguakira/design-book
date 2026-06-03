import { Link } from 'react-router-dom'
import { sections } from '../registry'

export default function Home() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold">Design Book</h1>
      <p className="text-sm text-zinc-600 mt-2">
        コンポーネント・画面・アイデアをためる場所。左サイドバーから選ぶか、下のカードから。
      </p>

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.id}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              {section.label}
            </h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.entries.map((entry) => (
                <Link
                  key={entry.slug}
                  to={`/${section.id}/${entry.slug}`}
                  className="block rounded-lg border border-zinc-200 bg-white p-4 hover:border-zinc-400 hover:shadow-sm transition"
                >
                  <div className="font-medium">{entry.title}</div>
                  {entry.description && (
                    <div className="text-xs text-zinc-500 mt-1 line-clamp-2">
                      {entry.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
