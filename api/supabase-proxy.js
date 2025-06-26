ximport { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  try {
    const { query, steep, domains, time_horizon, limit } = req.query;
    const searchLimit = parseInt(limit) || 5;

    let supabaseQuery = supabase.from('signals').select('*');

    if (query) {
      supabaseQuery = supabaseQuery.ilike('description', `%${query}%`);
    }
    if (steep) {
      supabaseQuery = supabaseQuery.eq('steep', steep);
    }
    if (domains) {
      supabaseQuery = supabaseQuery.eq('domains', domains);
    }
    if (time_horizon) {
      supabaseQuery = supabaseQuery.eq('time_horizon', time_horizon);
    }

    const { data, error } = await supabaseQuery.limit(searchLimit);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signal query failed', details: err.message });
  }
}
