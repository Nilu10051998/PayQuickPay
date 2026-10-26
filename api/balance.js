export default async function handler(req,res){
  const {username="505942",pwd="605254"} = req.query;
  try{
    const r = await fetch(https://business.aitopup.com/recharge/api/balance?username=${username}&pwd=${pwd}&format=json);
    const data = await r.text();
    res.status(200).json({balance:data});
  }catch(e){
    res.status(200).json({balance:"Error: "+e.message});
  }
}
