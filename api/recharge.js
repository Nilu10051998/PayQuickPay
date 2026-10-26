export default async function handler(req, res) {
  try {
    const { mobile, operator, amount } = req.query;
    if(!mobile) return res.status(200).send("Mobile missing");
    let txn = "TXN" + Date.now();
    let msg = `${operator}$${mobile}$${amount}$605254$0$${txn}`;
    let url = `https://business.aitopup.com/Admin/RechargeAPI.aspx?UserID=505942&Password=605254&MobileNo=7908824917&Message=${encodeURIComponent(msg)}`;
    const r = await fetch(url);
    const t = await r.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(t);
  } catch(e){
    return res.status(200).send("Recharge Error: " + e.message);
  }
}
