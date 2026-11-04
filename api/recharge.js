// api/recharge.js - PayQuickPay FINAL - Password 605254
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { number, amount, operatorcode, circlecode, orderid } = req.query;
    if (!number || !amount || !operatorcode || !circlecode) {
      return res.status(200).json({ status: "Failed", message: "Parameter is missing" });
    }
    const username = "505942";
    const pwd = "605254"; // <-- A1 APP PASSWORD - THIK - 605254

    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid || 'PAY' + Date.now()}&format=json`;

    const response = await fetch(url);
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    return res.status(200).json({ requestURL: url, response: data, raw: text });
  } catch (err) {
    return res.status(200).json({ status: "Failed", error: err.message });
  }
}
