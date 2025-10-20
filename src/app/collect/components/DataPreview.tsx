'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface MeterData {
  id: number
  customer_id: string
  date: string
  consumption_kwh: number
}

export default function DataPreview() {
  const [data, setData] = useState<MeterData[]>([])
  const [loading, setLoading] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [allData, setAllData] = useState<MeterData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 10

  const fetchPreviewData = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("meter_data")
      .select("*")
      .order("id", { ascending: false })
      .limit(5)

    if (!error && data) setData(data)
    setLoading(false)
  }

  const fetchAllData = async (page: number = 1) => {
    setLoading(true)
    const from = (page - 1) * itemsPerPage
    const to = from + itemsPerPage - 1

    const { data, error, count } = await supabase
      .from("meter_data")
      .select("*", { count: 'exact' })
      .order("id", { ascending: false })
      .range(from, to)

    if (!error && data) {
      setAllData(data)
      setTotalCount(count || 0)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPreviewData()
  }, [])

  const handleViewMore = () => {
    setShowOverlay(true)
    fetchAllData(1)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchAllData(page)
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Recent Data Preview</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Customer ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Consumption (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{row.customer_id}</td>
                  <td className="px-4 py-2">{new Date(row.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{row.consumption_kwh}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  {loading ? "Loading..." : "No data available yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleViewMore}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        View More
      </button>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">All Meter Data</h2>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Consumption (kWh)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.length > 0 ? (
                      allData.map((row) => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{row.id}</td>
                          <td className="px-4 py-3">{row.customer_id}</td>
                          <td className="px-4 py-3">{new Date(row.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">{row.consumption_kwh}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">
                          {loading ? "Loading..." : "No data available."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t px-6 py-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                  <div className="text-sm text-gray-700">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} entries
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, index, array) => {
                        const showEllipsis = index < array.length - 1 && array[index + 1] !== page + 1
                        return (
                          <div key={page} className="flex items-center">
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 border rounded ${
                                currentPage === page
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {page}
                            </button>
                            {showEllipsis && (
                              <span className="px-2 text-gray-500">...</span>
                            )}
                          </div>
                        )
                      })}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}