export default async function handler(req,res){
 const r=await fetch('https://business.a1topup.com/recharge/balance?username=505942&pwd=605254&format=json');
 const t=await r.text(); res.status(200).json({raw:t});
}
