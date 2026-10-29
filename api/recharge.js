export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { number, operatorcode, circlecode, amount, orderid } = req.query;
  
  // Real A1 Business API
  const username = "505942";
  const pwd = "605254";
  
  const url = `https://business.a1topup.com/recharge/api?username=${username}&pwd=${pwd}&circlecode=${circlecode || "23"}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid || Date.now()}`;

  try {
    const r = await fetch(url);
    const t = await r.text();
    // Real response: {"txid":"5804","status":"Success","opid":"..."}
    return res.status(200).json({ raw: t, url: url });
  } catch(e) {
    return res.status(200).json({ raw: JSON.stringify({ status: "Failed", error: e.message }) });
  }
}
