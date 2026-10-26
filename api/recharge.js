export default async function handler(req,res){
  const {mobile,operator,amount} = req.query;
  if(!mobile || !operator || !amount) return res.json({status:"fail",msg:"Missing params"});
  
  try{
    // REAL A1TOPUP API CALL
    const url = https://business.aitopup.com/recharge/api/recharge?username=505942&pwd=605254&number=${mobile}&op=${operator}&amount=${amount}&format=json;
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  }catch(e){
    res.status(200).json({status:"fail",error:e.message});
  }
}
