// api/recharge.js - PayQuickPay FINAL + TrueIP
import { ProxyAgent } from 'undici';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { number, amount, operatorcode, circlecode, orderid } = req.query;
    if (!number || !amount || !operatorcode || !circlecode) {
      return res.status(200).json({ status: "Failed", message: "Parameter is missing" });
    }

    const username = process.env.A1_USER;
    const pwd = process.env.A1_PWD;

    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid || 'PAY' + Date.now()}&format=json`;

    const agent = new ProxyAgent(process.env.PROXY_URL);
    const response = await fetch(url, { dispatcher: agent });
    const text = await response.text();

    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    return res.status(200).json({ requestURL: url, response: data, raw: text });

  } catch (err) {
    return res.status(200).json({ status: "Failed", error: err.message });
  }
}
