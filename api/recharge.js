// api/recharge.js - FINAL FIXED
export default async function handler(req, res) {
  try {
    const { number, amount, operatorcode, circlecode, orderid } = req.query;
    const username = "505942"; // Tuma App Re Ehi Achhi - 585942 Nuhna
    const pwd = "Ps-605254";
    const finalOrderId = orderid || ("PAY" + Date.now().toString());

    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=${circlecode || "23"}&operatorcode=${operatorcode || "RC"}&number=${number}&amount=${amount}&orderid=${finalOrderId}&format=json`;

    const response = await fetch(url);
    const text = await response.text();
    try {
      return res.status(200).json(JSON.parse(text));
    } catch(e) {
      return res.status(200).json({ raw: text });
    }
  } catch(err) {
    return res.status(200).json({ error: err.message });
  }
}
