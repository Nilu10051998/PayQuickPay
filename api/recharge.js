export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  const { mobile, op, amt } = req.query;
  if(!mobile || !op || !amt) return res.status(400).json({error:"Missing"});
  try{
    const txn = "TXN"+Date.now();
    const msg = `${op}$${mobile}$${amt}$605254$0$${txn}`;
    const url = `https://business.aitopup.com/Admin/RechargeAPI.aspx?UserID=505942&Password=605254&MobileNo=7908824917&Message=${encodeURIComponent(msg)}`;
    const r = await fetch(url);
    const t = await r.text();
    return res.status(200).json({ success:true, raw:t, txn });
  }catch(e){
    return res.status(500).json({ success:false, error:e.message });
  }
}
