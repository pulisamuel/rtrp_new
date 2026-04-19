import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ctzaaewdoanqvfojcdkt.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0emFhZXdkb2FucXZmb2pjZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzUzMTgsImV4cCI6MjA4NjkxMTMxOH0.HzoRd2YQ0OT05Mgp4hfkmE0pwr_rm-dF0DDaHgNvUHQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
