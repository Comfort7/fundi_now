/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <div className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </div>
          <p className="text-gray-600 mb-8 max-w-md">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Or try searching for what you need:
            </p>
            <div className="mt-2 flex gap-2 justify-center flex-wrap">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm">
                Find Services
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/worker-dashboard" className="text-blue-600 hover:text-blue-800 text-sm">
                Worker Dashboard
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
