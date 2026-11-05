// api/recharge.js - FINAL FIX
import { ProxyAgent } from 'undici';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { number, amount, operatorcode, circlecode, orderid } = req.query;
    const username = process.env.A1_USER;
    const pwd = process.env.A1_PWD;
    const proxyUrl = process.env.PROXY_URL;

    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid || 'PAY' + Date.now()}&format=json`;

    let response;
    if (proxyUrl) {
      const agent = new ProxyAgent(proxyUrl);
      response = await fetch(url, { dispatcher: agent });
    } else {
      response = await fetch(url);
    }

    const text = await response.text();
    return res.status(200).json({ raw: text, proxyUsed: !!proxyUrl });

  } catch (err) {
    return res.status(200).json({ status: "Failed", error: err.message, proxy: process.env.PROXY_URL ? "set" : "MISSING" });
  }
}
