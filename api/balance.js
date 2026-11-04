// api/balance.js - A1 Balance FIXED
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const username = "505942";
    const pwd = "hpjqnhhw";

    // A1 Balance API - Try 1
    const urls = [
      `https://business.a1topup.com/recharge/balance?username=${username}&pwd=${pwd}&format=json`,
      `https://business.a1topup.com/api/balance?username=${username}&pwd=${pwd}&format=json`,
      `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&format=json&action=balance`
    ];

    for (let url of urls) {
      try {
        const r = await fetch(url);
        const t = await r.text();
        if (t && !t.toLowerCase().includes("parameter is missing") && !t.toLowerCase().includes("authentication fail")) {
          return res.status(200).json({ balance: t, raw: t, url });
        }
      } catch(e) {}
    }
    // Jodi Balance API Na Mile - A1 Panel Re Balance Dekha
    return res.status(200).json({ balance: "Check A1 Panel", message: "Balance API not available - Panel Re Dekha - Recharge Chaliba", raw: "A1 Panel Balance: https://business.a1topup.com" });
  } catch(err) {
    return res.status(200).json({ error: err.message });
  }
}
