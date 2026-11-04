// api/balance.js
export default async function handler(req, res) {
  const username = "585942";
  const pwd = "Ps-605254";
  const url = `https://business.a1topup.com/recharge/balance?username=${username}&pwd=${pwd}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
