export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  const USERID="505942";
  const PASS="605254";
  const MOBILE="7908824917"; // TUMA REAL MOBILE
  const PIN="605254";
  try{
    const msg=BAL$${PIN};
    const url=https://business.aitopup.com/Admin/RechargeAPI.aspx?UserID=${USERID}&Password=${PASS}&MobileNo=${MOBILE}&Message=${encodeURIComponent(msg)};
    const r=await fetch(url);
    const t=await r.text();
    return res.status(200).json({balance:t, live_url:url, mobile:MOBILE});
  }catch(e){ return res.status(200).json({balance:"Error: "+e.message}); }
}
