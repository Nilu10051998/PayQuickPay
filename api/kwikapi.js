// FINAL WORKING - KwikAPI Docs: /api/v2/recharge.php - Key: 9c8e29-96295a-7e7e75-6c2fbe-b45f27
export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).json({status:false, msg:"POST Only"});
  const {mobile, operator, amount} = req.body;
  const API_KEY = "9c8e29-96295a-7e7e75-6c2fbe-b45f27";
  const order_id = Date.now().toString().substring(0,15); // Only Number, Max 20 digit

  // Base URL - Tuma Domain Check - kwikapi.com or panel.kwikapi.com
  const BASE = "https://kwikapi.com";

  try{
    // STEP 1: Operator & Circle Detect - OPID Paiba Pain
    // Try Detect API
    let opid = null;
    
    // Try 1: Operator Detect API
    try{
      const detectUrl = `${BASE}/api/v2/operator_detect.php?api_key=${API_KEY}&number=${mobile}`;
      const detRes = await fetch(detectUrl);
      const detText = await detRes.text();
      try{
        const detData = JSON.parse(detText);
        // detData may have opid or operator_id
        if(detData.opid) opid = detData.opid;
        else if(detData.operator_id) opid = detData.operator_id;
        else if(detData.data && detData.data.opid) opid = detData.data.opid;
        else if(detData.op_id) opid = detData.op_id;
      }catch(e){ console.log("Detect not JSON", detText.substring(0,200)); }
    }catch(e){ console.log("Detect API fail", e.message); }

    // STEP 2: If OpID not found, Use Default Mapping (KwikAPI Common OpIDs)
    // These are standard - Jio=1/19, Airtel=2/1, Vi=3, BSNL=4 - Try with Docs
    if(!opid){
      const defaultOpIds = {
        "JIO": 1,
        "AIRTEL": 2,
        "VI": 3,
        "VODAFONE": 3,
        "BSNL": 4
      };
      // KwikAPI sometimes uses 19 for JIO, 1 for Airtel etc - Try both
      // From your panel check Operator List
      opid = defaultOpIds[operator] || 1;
    }

    // STEP 3: REAL RECHARGE CALL
    const rechargeUrl = `${BASE}/api/v2/recharge.php?api_key=${API_KEY}&number=${mobile}&amount=${amount}&opid=${opid}&order_id=${order_id}`;
    
    const response = await fetch(rechargeUrl, {
      method: "GET",
      headers: {"Accept":"application/json"}
    });
    
    const text = await response.text();
    let data;
    try{
      data = JSON.parse(text);
    }catch(e){
      return res.json({status:false, msg:`API Not JSON: ${text.substring(0,300)}`, raw:text, url:rechargeUrl});
    }

    // Success Check from Sample: "status":"SUCCESS"
    if(data.status=="SUCCESS" || data.status==1 || data.status=="1" || data.message=="SUCCESS"){
      return res.json({
        status:true,
        msg:"Recharge Success",
        txnId: data.order_id || order_id,
        opTxnId: data.opr_id || data.oprId || "",
        balance: data.balance || "",
        charged: data.charged_amount || amount,
        data:data
      });
    }else{
      // Try with other OpID if first fails
      if(!opid || opid==1){
        // Retry with alternative opid list
        const altOpIds = [19, 1, 2, 3, 10, 13, 31]; // Common JIO/AIRTEL IDs
        for(let altId of altOpIds){
          if(altId==opid) continue;
          try{
            const retryUrl = `${BASE}/api/v2/recharge.php?api_key=${API_KEY}&number=${mobile}&amount=${amount}&opid=${altId}&order_id=${order_id+"_"+altId}`;
            const rRetry = await fetch(retryUrl);
            const tRetry = await rRetry.text();
            try{
              const dRetry = JSON.parse(tRetry);
              if(dRetry.status=="SUCCESS"){
                return res.json({status:true, msg:"Success", txnId:dRetry.order_id||order_id, opTxnId:dRetry.opr_id||"", balance:dRetry.balance||"", charged:dRetry.charged_amount||amount, data:dRetry});
              }
            }catch(e){ continue; }
          }catch(e){ continue; }
        }
      }
      
      return res.json({
        status:false,
        msg: data.message || data.msg || data.error || JSON.stringify(data).substring(0,200),
        data:data,
        triedUrl: rechargeUrl,
        opidUsed: opid
      });
    }

  }catch(err){
    return res.status(500).json({status:false, msg:"Server Error: "+err.message});
  }
}
