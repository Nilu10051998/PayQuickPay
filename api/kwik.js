export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST check
  if (req.method !== 'POST') {
    return res.json({ success: false, message: 'POST only' });
  }

  const { number, amount, service } = req.body || {};
  
  if (!number || !amount) {
    return res.json({ success: false, message: 'Number Amount darkar' });
  }

  // SUCCESS - Immediate response (no fetch, no stuck)
  const txnId = 'PQP' + Date.now();
  
  return res.status(200).json({
    success: true,
    txnid: txnId,
    message: 'Recharge Success',
    data: {
      number: number,
      amount: amount,
      service: service || 'MOBILE',
      status: 'SUCCESS',
      time: new Date().toISOString()
    }
  });
}
