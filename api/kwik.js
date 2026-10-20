export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { number, amount, op } = req.body;
  const API_KEY = process.env.KWIK_API_KEY || '9c8e29-96295a-7e7e75-6c2fbe-b45f27';

  if (!number || !amount) {
    return res.json({ success: false, message: 'Number & Amount darkar' });
  }

  try {
    // KwikAPI Live Recharge
    const params = new URLSearchParams();
    params.append('api_key', API_KEY);
    params.append('number', number);
    params.append('amount', amount.toString());
    params.append('op', op || '1');
    params.append('order_id', 'PQP' + Date.now());

    const response = await fetch('https://api.kwikapi.com/api/recharge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    const data = await response.json();
    console.log('KwikAPI Response:', data);

    // Success check - KwikAPI alaga alaga response dei pare
    if (data.status === 1 || data.status === true || data.response_code === 1 || data.success) {
      return res.json({ 
        success: true, 
        txnid: data.txnid || data.transaction_id || data.ref_id || 'PQP'+Date.now(),
        message: 'Recharge Success',
        data: data
      });
    } else {
      return res.json({ 
        success: false, 
        message: data.message || data.error || 'Failed',
        data: data
      });
    }

  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
}
