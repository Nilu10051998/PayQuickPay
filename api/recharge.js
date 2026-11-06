import { HttpsProxyAgent } from 'https-proxy-agent';
import https from 'https';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { number, amount, operatorcode, circlecode, orderid } = req.query;
    const username = process.env.A1_USER;
    const pwd = process.env.A1_PWD;
    const proxy = process.env.PROXY_URL;

    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}&format=json`;

    const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

    const data = await new Promise((resolve, reject) => {
      https.get(url, { agent }, (r) => {
        let t = "";
        r.on('data', (c) => t += c);
        r.on('end', () => resolve(t));
      }).on('error', (e) => reject(e));
    });

    return res.status(200).json({ raw: data });
  } catch (e) {
    return res.status(200).json({ raw: "Error: " + e.message });
  }
}
