export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  try{
    const url = "https://business.aitopup.com/Admin/RechargeAPI.aspx?UserID=505942&Password=605254&MobileNo=7908824917&Message=BAL$605254";
    const r = await fetch(url);
    const t = await r.text();
    return res.status(200).json({ success:true, raw:t });
  }catch(e){
    return res.status(500).json({ success:false, error:e.message });
  }
}
