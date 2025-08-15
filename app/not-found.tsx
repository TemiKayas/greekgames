import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found - Learn Greek Through Play',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted mb-8">
          The page you are looking for could not be found.
        </p>
        <Link 
          href="/"
          className="bg-primary hover:bg-primary-dark text-background font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
