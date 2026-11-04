// api/recharge.js
export default async function handler(req, res) {
  const { number, amount, operatorcode } = req.query;
  const username = "585942";
  const pwd = "Ps-605254";
  const orderid = Date.now().toString();

  const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=2&operatorcode=${operatorcode || "A"}&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;

  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
