// Force redeploy to load SUPABASE_KEY
// api/supabase-proxy.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const keyword = req.query.query || '';  // this is the search word
    const steep = req.query.steep;
    const domains = req.query.domains;
    const time_horizon = req.query.time_horizon;
    const limit = parseInt(req.query.limit) || 5;

    let query = supabase.from('signals').select('*');

    if (keyword) query = query.ilike('description', `%${keyword}%`);
    if (steep) query = query.eq('steep', steep);
    if (domains) query = query.eq('domains', domains);
    if (time_horizon) query = query.eq('time_horizon', time_horizon);

    const { data, error } = await query.limit(limit);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signal query failed', details: err.message });
  }
}
