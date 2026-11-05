import { HttpsProxyAgent } from 'https-proxy-agent';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { number, amount, operatorcode, circlecode, orderid } = req.query;
  const username = process.env.A1_USER;
  const pwd = process.env.A1_PWD;
  const proxy = process.env.PROXY_URL;

  if (!username || !pwd) {
    return res.status(200).json({ raw: "Vercel Re A1_USER / A1_PWD Set Heini" });
  }

  const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

  // Balance wala same pattern - business.a1topup.com
  const urls = [
    `https://business.a1topup.com/recharge/recharge?username=${username}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}&format=json`,
    `https://business.a1topup.com/recharge/doRecharge?username=${username}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}&format=json`,
    `https://business.a1topup.com/api/recharge?username=${username}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}&format=json`
  ];

  for (let url of urls) {
    try {
      const r = await fetch(url, { agent });
      const t = await r.text();
      // Jodi HTML 404 asila, pare try kara
      if (t.toLowerCase().includes("<!doctype") || t.toLowerCase().includes("has moved")) continue;
      return res.status(200).json({ raw: t, url, data: t });
    } catch (e) { continue; }
  }
  return res.status(200).json({ raw: "Recharge API not available - A1 Panel Re Check Kara" });
}
