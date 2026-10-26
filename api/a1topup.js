// /api/a1topup.js - Vercel Serverless - No CORS
export default async function handler(req, res){
  const { action, username, pwd, circlecode, operatorcode, number, amount, orderid } = req.query;
  
  // A1Topup credentials - Secure backend re
  const USERNAME = '505942';
  const PWD = '605254';
  const BASE = 'https://business.a1topup.com/recharge/';
  
  let apiUrl = '';
  if(action === 'balance'){
    apiUrl = `${BASE}balance?username=${USERNAME}&pwd=${PWD}&format=json`;
  } else if(action === 'recharge'){
    apiUrl = `${BASE}api?username=${USERNAME}&pwd=${PWD}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid}&format=json`;
  } else if(action === 'status'){
    apiUrl = `${BASE}status?username=${USERNAME}&pwd=${PWD}&orderid=${orderid}&format=json`;
  }
  
  try{
    const response = await fetch(apiUrl);
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(text);
  }catch(e){
    res.status(500).json({error:e.message});
  }
}
