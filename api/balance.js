// api/balance.js - FINAL FIXED
export default async function handler(req, res) {
  try {
    const username = "505942";
    const pwd = "Ps-605254";
    // Balance Pain Alga URL - Recharge URL Nuhna
    const url = `https://business.a1topup.com/recharge/balance?username=${username}&pwd=${pwd}&format=json`;
    const response = await fetch(url);
    const text = await response.text();
    try {
      return res.status(200).json(JSON.parse(text));
    } catch(e) {
      return res.status(200).json({ raw: text, balance: text });
    }
  } catch(err) {
    return res.status(200).json({ error: err.message });
  }
}
