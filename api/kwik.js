export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.json({ success: false, message: 'POST only' });

  const { number, amount, operator } = req.body || {};
  if (!number || !amount) return res.json({ success: false, message: 'Number/Amount darkar' });

  const API_KEY = process.env.KWIK_API_KEY || '9c8e29-96295a-2a8e41-0f7c33-93d9f2a3'; // Vercel env re set kara
  const BASE = 'https://kwikapi.com';

  try {
    // STEP 1: Operator & Circle Detect to get opid
    const detectUrl = `${BASE}/api/v2/operator-detect.php?api_key=${API_KEY}&number=${number}`;
    let opid = 1; // default Jio
    try {
      const detRes = await fetch(detectUrl);
      const detData = await detRes.json();
      if (detData.opid || detData.operator_id) opid = detData.opid || detData.operator_id;
      // Agar operator manually aaya
      if (operator) {
        const map = { 'JIO': 1, 'AIRTEL': 2, 'VI': 3, 'BSNL': 4, 'TATA': 6 };
        opid = map[operator.toUpperCase()] || opid;
      }
    } catch (e) { console.log('Detect fail, using default opid', e.message); }

    // STEP 2: Recharge
    const order_id = 'PQP' + Date.now() + Math.floor(Math.random()*1000);
    const rechargeUrl = `${BASE}/api/v2/recharge.php?api_key=${API_KEY}&number=${number}&amount=${amount}&opid=${opid}&order_id=${order_id}`;

    const kRes = await fetch(rechargeUrl);
    const kData = await kRes.json();
    console.log('KwikAPI Response:', kData);

    if (kData.status === 'SUCCESS' || kData.message === 'SUCCESS') {
      return res.json({ success: true, txnid: kData.opr_id || order_id, data: kData, message: 'Recharge SUCCESS' });
    } else {
      return res.json({ success: false, message: kData.message || 'Recharge Failed', data: kData });
    }

  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: 'Server Error: ' + err.message });
  }
}
