export default async function handler(req, res) {
  // CORS allow
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { number, amount, op } = req.body;
  const API_KEY = '9c8e29-96295a-7e7e75-6c2fbe-b45f27';

  console.log('Request:', number, amount, op);

  if (!number || !amount) {
    return res.json({ success: false, message: 'Number Amount darkar' });
  }

  // KwikAPI real endpoints - try 1 by 1
  const endpoints = [
    `https://kwikapi.com/api/recharge?api_key=${API_KEY}&number=${number}&amount=${amount}&op=${op||'1'}&order_id=PQP${Date.now()}`,
    `https://kwikapi.com/app/api/recharge.php?api_key=${API_KEY}&number=${number}&amount=${amount}&operator=${op||'1'}`
  ];

  try {
    let lastError = null;
    for (const url of endpoints) {
      try {
        console.log('Trying:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'User-Agent': 'PayQuickPay/1.0' }
        });
        const text = await response.text();
        console.log('Raw Response:', text);
        let data;
        try { data = JSON.parse(text); } catch { data = { raw: text }; }
        
        // Success
        return res.json({ 
          success: true, 
          txnid: data.txnid || data.tid || data.refid || 'PQP'+Date.now(),
          message: 'Success',
          kwikResponse: data
        });
      } catch (e) {
        lastError = e;
        console.log('Failed:', e.message);
        continue;
      }
    }
    throw lastError || new Error('All endpoints failed');

  } catch (e) {
    console.error('Final Error:', e);
    return res.status(500).json({ 
      success: false, 
      message: 'fetch failed - '+e.message,
      error: e.toString()
    });
  }
}
