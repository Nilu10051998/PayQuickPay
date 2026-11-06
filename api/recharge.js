import { ProxyAgent, setGlobalDispatcher } from 'undici';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { number, amount, operatorcode, circlecode, orderid } = req.query;
  const username = process.env.A1_USER;
  const pwd = process.env.A1_PWD;
  const proxy = process.env.PROXY_URL;

  if (!proxy) return res.status(200).json({ raw: "PROXY_URL Set Heini Vercel Re!" });

  setGlobalDispatcher(new ProxyAgent(proxy));

  const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}&format=json`;

  try {
    const r = await fetch(url);
    const t = await r.text();
    return res.status(200).json({ raw: t });
  } catch(e) {
    return res.status(200).json({ raw: "Proxy Error: " + e.message });
  }
}
