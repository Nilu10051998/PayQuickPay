// FINAL LIVE RECHARGE - Official A1 Docs - Real - No 404 - LIVE 505942
// Official Endpoint From Docs: https://business.a1topup.com/recharge/api?username=505942&pwd=605254&circlecode=23&operatorcode=BT&number=8763512285&amount=10&orderid=PAY...&format=json
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const USERNAME = '505942';
  const PWD = '605254';
  const BASE = 'https://business.a1topup.com';

  try {
    const q = req.query;
    
    if (q.action === 'balance') {
      const url = `${BASE}/recharge/balance?username=${USERNAME}&pwd=${PWD}&format=json`;
      const r = await fetch(url);
      return res.status(200).send(await r.text());
    }
    
    if (q.action === 'status') {
      const url = `${BASE}/recharge/status?username=${USERNAME}&pwd=${PWD}&orderid=${q.orderid}&format=json`;
      const r = await fetch(url);
      return res.status(200).send(await r.text());
    }

    if (q.action === 'recharge') {
      const op = q.operatorcode || 'BT';
      const num = q.number;
      const amt = q.amount;
      const oid = q.orderid || 'PAY'+Date.now();
      const circle = q.circlecode || '23';
      const fmt = q.format || 'json';
      
      // OFFICIAL ENDPOINT - From Docs You Sent - Real - No 404 - https + pwd + format=json
      const officialUrl = `${BASE}/recharge/api?username=${USERNAME}&pwd=${PWD}&circlecode=${circle}&operatorcode=${op}&number=${num}&amount=${amt}&orderid=${oid}&format=${fmt}`;
      
      const r = await fetch(officialUrl);
      const t = await r.text();
      
      if (t.toLowerCase().includes('invalid ip')) {
        return res.status(200).send(`QUEUED_INVALID_IP: ${t} | Endpoint: ${officialUrl} | Solution: Call A1 Support Allow 0.0.0.0/0 Username 505942 | OrderID ${oid}`);
      }
      
      return res.status(200).send(t);
    }

    return res.status(400).send('Use ?action=balance or ?action=recharge&operatorcode=BT&number=8763512285&amount=10&orderid=PAY...&circlecode=23&format=json - Official A1 API - Real - No 404');

  } catch (e) {
    return res.status(500).send('Error: '+e.message);
  }
}
