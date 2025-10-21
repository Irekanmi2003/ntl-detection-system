"use server"

import { supabase } from "@/lib/supabaseClient"


// Define proper TypeScript interfaces
interface RawDataRow {
  customer_id?: string;
  date?: string;
  consumption_kwh?: string;
}

interface CleanDataRow {
  customer_id: string;
  date: string;
  consumption_kwh: number;
}

export default async function uploadData(rows: RawDataRow[]) {
  try {
    // Filter and validate rows
    const cleanRows: CleanDataRow[] = rows
      .filter((r: RawDataRow) => r.customer_id && r.date && r.consumption_kwh)
      .map((r: RawDataRow) => {
        // Validate date
        const date = new Date(r.date!)
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date format: ${r.date}`)
        }

        // Validate consumption
        const consumption = parseFloat(r.consumption_kwh!)
        if (isNaN(consumption) || consumption < 0) {
          throw new Error(`Invalid consumption value: ${r.consumption_kwh}`)
        }

        return {
          customer_id: String(r.customer_id).trim(),
          date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
          consumption_kwh: consumption,
        }
      })

    if (cleanRows.length === 0) {
      return "❌ No valid data found to upload."
    }

    const { error } = await supabase.from("meter_data").insert(cleanRows)
    if (error) {
      if (error.code === '23505') {
        return "❌ Duplicate entry found. Each customer can only have one record per date."
      }
      throw error
    }

    return `✅ Successfully uploaded ${cleanRows.length} record(s)!`
  } catch (err: unknown) {
    console.error("Upload error:", err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    return `❌ Failed to upload data: ${errorMessage}`
  }
}