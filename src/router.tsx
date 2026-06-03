import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './layout/Layout'
import Home from './pages/Home'
import { sections } from './registry'

const entryRoutes = sections.flatMap((section) =>
  section.entries.map((entry) => ({
    path: `${section.id}/${entry.slug}`,
    element: (
      <Suspense fallback={<div className="p-8 text-sm text-zinc-500">Loading…</div>}>
        <entry.Component />
      </Suspense>
    ),
  })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...entryRoutes,
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
