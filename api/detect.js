export default async function handler(req,res){
  const {mobile} = req.query;
  try{
    // A1TOPUP Operator Check API
    const r = await fetch(https://business.aitopup.com/recharge/api/operator?mobile=${mobile}&username=505942&pwd=605254);
    const data = await r.text();
    res.status(200).json({operator:data});
  }catch(e){
    res.status(200).json({operator:"AIRTEL"});
  }
}
