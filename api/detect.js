// Auto Operator Detect - KwikAPI
export default async function handler(req,res){
  const {number} = req.query;
  if(!number || number.length!=10) return res.json({status:false});
  
  const API_KEY = "9c8e29-96295a-7e7e75-6c2fbe-b45f27";
  const BASE = "https://kwikapi.com";
  
  try{
    const url = `${BASE}/api/v2/operator_detect.php?api_key=${API_KEY}&number=${number}`;
    const r = await fetch(url);
    const text = await r.text();
    let data;
    try{ data = JSON.parse(text); }catch{ return res.json({status:false, raw:text}) }
    
    // Map opid to name
    let opid = data.opid || data.operator_id || data.op_id || (data.data && data.data.opid) || 0;
    let opName = "";
    // KwikAPI opid mapping
    const map = {1:"JIO", 2:"AIRTEL", 3:"VI", 4:"BSNL", 5:"JIO", 6:"AIRTEL"};
    if(map[opid]) opName = map[opid];
    else if(data.operator) opName = data.operator.toUpperCase();
    else if(data.data && data.data.operator) opName = data.data.operator.toUpperCase();
    
    if(opName.includes("JIO")) opName="JIO";
    else if(opName.includes("AIRTEL") || opName.includes("BHARTI")) opName="AIRTEL";
    else if(opName.includes("VODAFONE") || opName.includes("IDEA") || opName.includes("VI")) opName="VI";
    else if(opName.includes("BSNL")) opName="BSNL";
    
    return res.json({status:true, opid, operator:opName, raw:data});
  }catch(e){
    return res.json({status:false, error:e.message});
  }
}
