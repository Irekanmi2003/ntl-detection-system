import DataUpload from "./components/DataUpload"
import DataPreview from "./components/DataPreview"

export default function CollectPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Data Collection Portal
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Upload your prepaid meter consumption dataset (CSV format) for processing and AI analysis.
        </p>

        <div className="flex flex-col gap-10">
          <DataUpload />
          <DataPreview />
        </div>

        <div className="text-center mt-12">
          <a
            href="/dashboard"
            className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Proceed to Dashboard →
          </a>
        </div>
      </section>
    </main>
  )
}