import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-700 tracking-tight">
          AI-Based Non-Technical Loss (NTL) Detection System
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          This system leverages <span className="font-semibold text-blue-700">Artificial Intelligence</span> 
          to detect anomalies in prepaid electricity consumption data — helping power 
          distribution companies identify theft, tampering, and billing irregularities efficiently.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/collect"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Start Data Collection →
          </Link>
          <a
            href="https://supabase.com"
            target="_blank"
            className="px-8 py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-500">
        © 2025 AI NTL Detection Project | University of Lagos
      </footer>
    </main>
  )
}