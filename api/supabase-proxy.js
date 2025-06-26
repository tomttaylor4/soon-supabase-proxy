export default async function handler(req, res) {
  const { query } = req;

  const url = new URL("https://sqcnmjkxtqokmvadseny.supabase.co/rest/v1/signals");
  Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));

  const response = await fetch(url.toString(), {
    headers: {
      apikey: process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY25tamt4dHFva212YWRzZW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MjU3MTUsImV4cCI6MjA2NjQwMTcxNX0.gL3XTcUw24-J6Xwk1tpwErUARAuiwkwS-VCy2dbZU8k,
      Authorization: `Bearer ${process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY25tamt4dHFva212YWRzZW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MjU3MTUsImV4cCI6MjA2NjQwMTcxNX0.gL3XTcUw24-J6Xwk1tpwErUARAuiwkwS-VCy2dbZU8k}`
    }
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
