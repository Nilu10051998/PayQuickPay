import { HttpsProxyAgent } from 'https-proxy-agent';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const username = process.env.A1_USER;
    const pwd = process.env.A1_PWD;
    const proxy = process.env.PROXY_URL;
    const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;
    const urls = [
      `https://business.a1topup.com/recharge/balance?username=${username}&pwd=${pwd}&format=json`,
      `https://business.a1topup.com/api/balance?username=${username}&pwd=${pwd}&format=json`
    ];
    for (let url of urls) {
      try {
        const r = await fetch(url, { agent });
        const t = await r.text();
        if (t && !t.toLowerCase().includes("parameter is missing") && !t.toLowerCase().includes("authentication fail")) {
          return res.status(200).json({ balance: t, raw: t, url });
        }
      } catch(e) {}
    }
    return res.status(200).json({ balance: "Check A1 Panel", raw: "Balance API not available" });
  } catch(err) {
    return res.status(200).json({ error: err.message });
  }
}
