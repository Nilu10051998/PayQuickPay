import { HttpsProxyAgent } from 'https-proxy-agent';

export default async function handler(req, res) {
  const { number, amount, operatorcode, circlecode, orderid } = req.query;
  const user = process.env.A1_USER;
  const pwd = process.env.A1_PWD;
  const proxy = process.env.PROXY_URL;

  const apiUrl = `https://a1topup.com/api/recharge?user=${user}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}`;

  try {
    const agent = new HttpsProxyAgent(proxy);
    const r = await fetch(apiUrl, { agent });
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({ raw: "Proxy Error: " + e.message });
  }
}
