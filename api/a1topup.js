export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  
  const USERNAME='505942';
  const PWD='605254';
  const BASE='https://business.a1topup.com/recharge/';
  
  const { action, operatorcode, number, amount, orderid, circlecode } = req.query;
  
  let url='';
  if(action=='balance'){
    url=`${BASE}balance?username=${USERNAME}&pwd=${PWD}&format=json`;
  } else {
    url=`${BASE}api?username=${USERNAME}&pwd=${PWD}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;
  }
  
  try{
    const r=await fetch(url);
    const text=await r.text();
    res.status(200).send(text);
  }catch(e){
    res.status(500).send('Error: '+e.message);
  }
}
