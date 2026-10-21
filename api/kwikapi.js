// api/kwikapi.js - KwikAPI Real Recharge Integration
// API Key: 9c8e29-96295a-7e7e75-6c2fbe-b45f27

export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).json({status:false, msg:"Only POST Allowed"});
  
  const {mobile, operator, amount} = req.body;
  
  if(!mobile || !amount) return res.json({status:false, msg:"Mobile & Amount Required"});

  const API_KEY = "9c8e29-96295a-7e7e75-6c2fbe-b45f27";
  const txnId = "PQ"+Date.now();

  // KwikAPI Operator Codes - Tuma Panel re Check Kara - Eta Standard
  const opCodes = {
    "JIO": "1",        // Jio
    "AIRTEL": "2",     // Airtel  
    "VI": "3",         // VI
    "BSNL": "4",       // BSNL
    "JIO": "JIO",
    "AIRTEL": "AIRTEL",
    "VI": "VI",
    "BSNL": "BSNL"
  };

  // Try Multiple KwikAPI Endpoints - Jouthi Chaliba
  const endpoints = [
    `https://kwikapi.com/api/v2/recharge?api_key=${API_KEY}&number=${mobile}&operator=${operator}&amount=${amount}&txnid=${txnId}`,
    `https://kwikapi.com/api/recharge?api_key=${API_KEY}&number=${mobile}&operator=${operator}&amount=${amount}&txnid=${txnId}&format=json`,
    `https://api.kwikapi.com/recharge?api_key=${API_KEY}&mobile=${mobile}&operator=${opCodes[operator]||operator}&amount=${amount}&orderid=${txnId}`
  ];

  try{
    let lastResult = null;
    for(let apiUrl of endpoints){
      try{
        const response = await fetch(apiUrl, {method:"GET", headers:{"Accept":"application/json"}});
        const text = await response.text();
        let data;
        try{ data = JSON.parse(text); }catch(e){ data = {raw:text}; }
        
        lastResult = data;
        
        // Success Conditions
        if(data.status==1 || data.status=="1" || data.status=="SUCCESS" || data.response_code==1 || data.statuscode=="TXN" || data.status_code==1 || data.success==true){
          return res.json({
            status:true, 
            msg:"Recharge Success", 
            txnId: data.txnid || data.txid || data.transaction_id || data.orderid || txnId,
            opTxnId: data.op_id || data.operator_ref || data.liveid || "",
            balance: data.balance || "",
            data:data
          });
        }
        
        // If Failed but Valid JSON, break and return
        if(data.message || data.msg || data.error){
          if(!data.message?.includes("Invalid") && !data.msg?.includes("Invalid")){
            // Continue trying other endpoints only if Invalid format
          }
        }
      }catch(e){ continue; }
    }
    
    // All Endpoints Tried - Return Last Result
    return res.json({
      status:false, 
      msg: lastResult?.message || lastResult?.msg || lastResult?.error || "Recharge Failed - Check API Docs",
      raw: lastResult,
      txnId: txnId
    });
    
  }catch(err){
    return res.status(500).json({status:false, msg:"Server Error: "+err.message, txnId: txnId});
  }
}
