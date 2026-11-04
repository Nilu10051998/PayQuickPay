// api/balance.js - PayQuickPay - Password 605254
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const username = "505942";
    const pwd = "605254";
    const urls = [
      `https://business.a1topup.com/recharge/balance?username=${username}&pwd=${pwd}&format=json`,
      `https://business.a1topup.com/api/balance?username=${username}&pwd=${pwd}&format=json`
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
    return res.status(200).json({ balance: "Check A1 Panel", raw: "Balance API not available" });
  } catch(err) {
    return res.status(200).json({ error: err.message });
  }
}
