// api/recharge.js - NO ProxyAgent - 100% Working
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  try {
    const { number, amount, operatorcode, circlecode, orderid } = req.query;
    if (!number || !amount || !operatorcode || !circlecode) {
      return res.status(200).json({ status: "Failed", message: "Parameter missing" });
    }
    const username = process.env.A1_USER;
    const pwd = process.env.A1_PWD;
    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid || 'PAY' + Date.now()}&format=json`;
    const response = await fetch(url);
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    return res.status(200).json({ success: true, a1: data, raw: text });
  } catch (err) {
    return res.status(200).json({ status: "Failed", error: err.message });
  }
}
