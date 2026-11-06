import { ProxyAgent } from 'undici';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { number, amount, operatorcode, circlecode, orderid } = req.query;
    const username = process.env.A1_USER;
    const pwd = process.env.A1_PWD;
    const proxy = process.env.PROXY_URL;

    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}&format=json`;

    let t = "";
    try {
      // 1st Try - Proxy Deiki
      const dispatcher = proxy ? new ProxyAgent(proxy) : undefined;
      const r = await fetch(url, dispatcher ? { dispatcher } : {});
      t = await r.text();
    } catch (e) {
      // Proxy Fail Hele Direct Try
      const r2 = await fetch(url);
      t = await r2.text();
    }
    return res.status(200).json({ raw: t });
  } catch (e) {
    return res.status(200).json({ raw: "Error: " + e.message });
  }
}
