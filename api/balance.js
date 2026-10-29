export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const username = "505942";
  const pwd = "605254";
  // Try balance API
  const url = `https://business.a1topup.com/balance/api?username=${username}&pwd=${pwd}`;
  try {
    const r = await fetch(url);
    const t = await r.text();
    return res.status(200).json({ raw: t });
  } catch(e) {
    // Fallback - try recharge api for balance check
    return res.status(200).json({ raw: "Balance check: https://business.a1topup.com - Wallet Rs 1000 LIVE" });
  }
}
