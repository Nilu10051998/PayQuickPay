export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'POST only' });

  const { number, amount, operator } = req.body || {};
  if (!number || !amount) return res.json({ success: false, message: 'Number & Amount darkar' });

  const API_KEY = '9c8e29-96295a-7e7e75-6c2fbe-b45f27';
  const BASE = 'https://kwikapi.com';
  const order_id = 'PQP' + Date.now() + Math.floor(Math.random()*1000);

  try {
    // STEP 1: Get correct opid from KwikAPI Detect
    let opid = null;
    try {
      const detectUrl = `${BASE}/api/v2/operator-detect.php?api_key=${API_KEY}&number=${number}`;
      console.log('Detect URL:', detectUrl);
      const detRes = await fetch(detectUrl);
      const detText = await detRes.text();
      console.log('Detect Raw:', detText);
      const detData = JSON.parse(detText);
      opid = detData.opid || detData.operator_id || detData.data?.opid;
      console.log('Found opid:', opid);
    } catch (e) {
      console.log('Detect failed:', e.message);
    }

    // Fallback opid mapping if detect fails
    if (!opid) {
      const map = { JIO: 1, AIRTEL: 2, VI: 3, BSNL: 4, Jio: 1, Airtel: 2, Vi: 3, 'Vodafone': 3 };
      opid = map[operator] || map[operator?.toUpperCase()] || 1;
      console.log('Using fallback opid:', opid);
    }

    // STEP 2: Real Recharge Call
    const rechargeUrl = `${BASE}/api/v2/recharge.php?api_key=${API_KEY}&number=${number}&amount=${amount}&opid=${opid}&order_id=${order_id}`;
    console.log('Recharge URL:', rechargeUrl);

    const kRes = await fetch(rechargeUrl);
    const kText = await kRes.text();
    console.log('Kwik Raw Response:', kText);
    
    let kData;
    try { kData = JSON.parse(kText); } 
    catch { return res.json({ success: false, message: 'KwikAPI Invalid Response: ' + kText.substring(0,200) }); }

    // Check SUCCESS
    if (kData.status === 'SUCCESS' || kData.message === 'SUCCESS' || kData.status === 'PENDING') {
      return res.json({ 
        success: true, 
        txnid: kData.opr_id || kData.order_id || order_id, 
        balance: kData.balance,
        message: 'Recharge SUCCESS',
        data: kData 
      });
    } else {
      return res.json({ 
        success: false, 
        message: kData.message || kData.error || 'Recharge Failed', 
        data: kData,
        debug: { rechargeUrl, opid, order_id }
      });
    }

  } catch (err) {
    console.error('Main Error:', err);
    return res.json({ success: false, message: 'Server Error: ' + err.message });
  }
}
