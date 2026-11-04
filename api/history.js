// api/history.js - NEW
export default async function handler(req, res) {
  try {
    const username = "505942";
    const pwd = "hpjqnhhw";
    const url = `https://business.a1topup.com/recharge/report?username=${username}&pwd=${pwd}&format=json`;
    const response = await fetch(url);
    const text = await response.text();
    try { return res.status(200).json(JSON.parse(text)); }
    catch(e) { return res.status(200).json({ raw: text }); }
  } catch(err) {
    return res.status(200).json({ error: err.message });
  }
}
