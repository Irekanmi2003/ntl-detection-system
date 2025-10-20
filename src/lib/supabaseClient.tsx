import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ffmteksbqrmlkrudupug.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbXRla3NicXJtbGtydWR1cHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5ODI5MjgsImV4cCI6MjA3NjU1ODkyOH0.tbSQtcvzITtKkYhYu8dU5HWQwuMKUi4bIc39_ZxD1Nk'

export const supabase = createClient(supabaseUrl, supabaseKey)
