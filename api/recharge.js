export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  const {mobile,operator,amount}=req.query;
  const USERID="505942";
  const PASS="605254";
  const MOBILE="7908824917"; // TUMA REAL MOBILE
  const PIN="605254";
  const TXNID="TXN"+Date.now();
  try{
    const op=operator||"JIO";
    const msg=`${op}$${mobile}$${amount}$${PIN}$0$${TXNID}`;
    const url=`https://business.aitopup.com/Admin/RechargeAPI.aspx?UserID=${USERID}&Password=${PASS}&MobileNo=${MOBILE}&Message=${encodeURIComponent(msg)}`;
    const r=await fetch(url);
    const t=await r.text();
    return res.status(200).json({status:"LIVE", a1_response:t, request_msg:msg, txn:TXNID});
  }catch(e){ return res.status(200).json({status:"fail", error:e.message}); }
}
