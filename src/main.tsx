import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const root = createRoot(document.getElementById('root')!)

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  root.render(<main className="min-h-screen page-surface flex items-center justify-center p-6"><div className="card-surface max-w-lg p-8 text-center"><h1 className="text-2xl font-bold">Site configuration unavailable</h1><p className="mt-3 text-gray-600">Please contact the site administrator. The service connection is not configured.</p></div></main>)
} else {
  import('./App.tsx')
    .then(({ default: App }) => root.render(<StrictMode><App /></StrictMode>))
    .catch(() => root.render(<main className="min-h-screen page-surface flex items-center justify-center p-6"><div className="card-surface max-w-lg p-8 text-center"><h1 className="text-2xl font-bold">Unable to load the site</h1><p className="mt-3 text-gray-600">Please refresh the page or try again shortly.</p></div></main>))
}
