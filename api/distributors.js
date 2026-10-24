export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const SUPABASE_URL = "https://hiyjowfyszctvhljsdgx.supabase.co";
  const SUPABASE_KEY = "sb_publishable_Qn7F0hoIeGD-q6nzO1HvzA_SFrFuNE2";
  
  try {
    const r = await fetch(${SUPABASE_URL}/rest/v1/distributors?select=*, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": Bearer ${SUPABASE_KEY} }
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
