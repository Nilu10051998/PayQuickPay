// api/balance.js - FIXED
export default async function handler(req, res) {
  try {
    const username = "585942";
    const pwd = "Ps-605254";
    // Balance API - format=json Nahi Dehle Text Ase, Seithi Text Neba
    const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&format=json`;
    
    const response = await fetch(url);
    const text = await response.text();

    // Jodi JSON Hele JSON, Nahi Hele Text Return Kara
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(200).json({ raw: text, balance: text });
    }
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
}
