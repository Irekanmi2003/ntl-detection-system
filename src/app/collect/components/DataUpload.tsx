'use client'

import { useState } from "react"
import Papa from "papaparse"
import uploadData from "../actions/uploadData"

// Define the same interface as in uploadData.ts
interface RawDataRow {
  customer_id?: string;
  date?: string;
  consumption_kwh?: string;
}

export default function DataUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [showManualEntry, setShowManualEntry] = useState(false)
  const [manualData, setManualData] = useState({
    customer_id: "",
    date: "",
    consumption_kwh: ""
  })

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file.")
    setUploading(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        // Type assertion to RawDataRow[]
        const rows = results.data as RawDataRow[]
        const res = await uploadData(rows)
        setMessage(res)
        setUploading(false)
      },
      error: (error) => {
        console.error("CSV parsing error:", error)
        setMessage("❌ Failed to parse CSV file")
        setUploading(false)
      }
    })
  }

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    // Convert manualData to RawDataRow format
    const manualRow: RawDataRow = {
      customer_id: manualData.customer_id,
      date: manualData.date,
      consumption_kwh: manualData.consumption_kwh
    }

    const res = await uploadData([manualRow])
    setMessage(res)
    setUploading(false)

    if (res.includes("✅")) {
      setManualData({ customer_id: "", date: "", consumption_kwh: "" })
      setShowManualEntry(false)
    }
  }

  return (
    <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:border-blue-400 transition">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Upload Meter Data</h2>

      {/* CSV Upload Section */}
      <div className="w-full mb-6">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Upload CSV File</h3>
        <p className="text-sm text-gray-500 mb-4">Format: customer_id, date, consumption_kwh</p>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full px-6 py-2 rounded-md text-white ${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>

      {/* Divider */}
      <div className="relative w-full my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Or</span>
        </div>
      </div>

      {/* Manual Entry Section */}
      <div className="w-full">
        <button
          onClick={() => setShowManualEntry(!showManualEntry)}
          className="w-full px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-4"
        >
          {showManualEntry ? "Cancel Manual Entry" : "Add Data Manually"}
        </button>

        {showManualEntry && (
          <form onSubmit={handleManualSubmit} className="space-y-4 p-4 border rounded-lg bg-white">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer ID
              </label>
              <input
                type="text"
                required
                value={manualData.customer_id}
                onChange={(e) => setManualData({...manualData, customer_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter customer ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={manualData.date}
                onChange={(e) => setManualData({...manualData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consumption (kWh)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={manualData.consumption_kwh}
                onChange={(e) => setManualData({...manualData, consumption_kwh: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter consumption"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full px-6 py-2 rounded-md text-white ${
                uploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {uploading ? "Adding..." : "Add Data"}
            </button>
          </form>
        )}
      </div>

      {message && (
        <p className={`mt-3 text-sm ${
          message.includes("✅") ? "text-green-600" : "text-red-600"
        }`}>
          {message}
        </p>
      )}
    </div>
  )
}