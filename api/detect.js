export default async function handler(req,res){
  const {number} = req.query;
  if(!number || number.length!=10){
    return res.json({status:false, msg:"Invalid"});
  }

  // Fallback Local Detection - MNP agare bhi 90% thik
  function localDetect(num){
    let n = parseInt(num.substring(0,4));
    // Jio series common
    if(num.startsWith("70")||num.startsWith("72")||num.startsWith("73")||num.startsWith("74")||num.startsWith("75")||num.startsWith("76")||num.startsWith("77")||num.startsWith("79")||num.startsWith("88")||num.startsWith("89")||num.startsWith("60")||num.startsWith("61")||num.startsWith("62")||num.startsWith("63")) return {operator:"JIO", opid:1};
    if(num.startsWith("90")||num.startsWith("91")||num.startsWith("92")||num.startsWith("99")||num.startsWith("98")||num.startsWith("81")||num.startsWith("80")||num.startsWith("70")==false) {
        // Airtel vs Vi split
        if(n>=9000 && n<=9499) return {operator:"AIRTEL", opid:2};
        if(n>=9500 && n<=9999) return {operator:"VI", opid:3};
        return {operator:"AIRTEL", opid:2};
    }
    return {operator:"JIO", opid:1};
  }

  try{
    const API_KEY = "9c8e29-96295a-7e7e75-6c2fbe-b45f27";
    // Try KwikAPI first
    const url = `https://kwikapi.com/api/v2/operator_detect.php?api_key=${API_KEY}&number=${number}`;
    const r = await fetch(url, {signal: AbortSignal.timeout(4000)});
    const txt = await r.text();
    let data;
    try{ data = JSON.parse(txt); }catch{ data = {}; }
    
    let op = data.operator || data.data?.operator || "";
    if(op){
      let up = op.toUpperCase();
      if(up.includes("JIO")) return res.json({status:true, operator:"JIO", opid:data.opid||1, source:"kwikapi"});
      if(up.includes("AIRTEL")||up.includes("BHARTI")) return res.json({status:true, operator:"AIRTEL", opid:data.opid||2, source:"kwikapi"});
      if(up.includes("VODA")||up.includes("IDEA")||up.includes("VI")) return res.json({status:true, operator:"VI", opid:data.opid||3, source:"kwikapi"});
      if(up.includes("BSNL")) return res.json({status:true, operator:"BSNL", opid:data.opid||4, source:"kwikapi"});
    }
    // If KwikAPI didn't give, use local
    let local = localDetect(number);
    return res.json({status:true, operator:local.operator, opid:local.opid, source:"local"});
    
  }catch(e){
    // Network fail - still return local detect so UI works
    let local = localDetect(number);
    return res.json({status:true, operator:local.operator, opid:local.opid, source:"local_fallback", error:e.message});
  }
}
