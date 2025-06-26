// api/supabase-proxy.js

import { createClient } from '@supabase/supabase-js'

// Read environment variables (must be defined in Vercel Settings)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    const {
      query = '',
      steep = '',
      domains = '',
      horizon = ''
    } = req.query

    let sbQuery = supabase.from('signals').select('*')

    // Full-text search across important fields
    if (query && query.trim() !== '') {
      const keyword = query.trim()
      sbQuery = sbQuery.or(`
        Signal Title.ilike.%${keyword}%,
        Description.ilike.%${keyword}%,
        Implication.ilike.%${keyword}%,
        Why It Matters.ilike.%${keyword}%
      `)
    }

    // Apply optional filters
    if (steep && steep.trim() !== '') {
      sbQuery = sbQuery.eq('STEEP', steep)
    }

    if (domains && domains.trim() !== '') {
      sbQuery = sbQuery.ilike('Domains', `%${domains}%`)
    }

    if (horizon && horizon.trim() !== '') {
      sbQuery = sbQuery.eq('Time Horizon', horizon)
    }

    // Fetch up to 5 results
    const { data, error } = await sbQuery.limit(5)

    if (error) {
      console.error('Supabase query error:', error)
      return res.status(500).json({ error: 'Error querying signal bank.' })
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Proxy handler error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}
