export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const url = `https://www.a1topup.com/API/balance.php?member_id=505942&pin=605254`;
    const r = await fetch(url);
    const t = await r.text();
    res.status(200).json({ raw: t });
  } catch (e) {
    res.status(200).json({ raw: "Error: " + e.message });
  }
}
