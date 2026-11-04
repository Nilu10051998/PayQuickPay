// api/recharge.js - FIXED
export default async function handler(req, res) {
  try {
    const { number, amount, operatorcode, circlecode } = req.query;
    const username = "585942";
    const pwd = "Ps-605254";
    const orderid = Date.now().toString();

    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=${circlecode || "23"}&operatorcode=${operatorcode || "RC"}&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;

    const response = await fetch(url);
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(200).json({ raw: text });
    }
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
}
