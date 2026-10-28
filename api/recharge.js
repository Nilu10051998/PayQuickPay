export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { mobile, op, amt } = req.query;
  try {
    const orderid = "PQ" + Date.now();
    const url = `https://www.a1topup.com/API/recharge.php?member_id=505942&pin=605254&number=${mobile}&operator=${op}&amount=${amt}&orderid=${orderid}`;
    const r = await fetch(url);
    const t = await r.text();
    res.status(200).json({ raw: t });
  } catch (e) {
    res.status(200).json({ raw: "Error: " + e.message });
  }
}
