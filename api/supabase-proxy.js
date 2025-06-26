export default async function handler(req, res) {
  try {
    const { query } = req;

    const url = new URL("https://sqcnmjkxtqokmvadseny.supabase.co/rest/v1/signals");
    Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));

    const response = await fetch(url.toString(), {
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}
