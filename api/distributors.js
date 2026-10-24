export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS'){return res.status(200).end();}
  const SUPA_URL="https://mojdysebckbodadjctj.supabase.co/rest/v1/distributors";
  const KEY="sb_publishable_D35DfvBe5XtgITTnKLWSwg_R0Qqsday";
  try{
    if(req.method==='GET'){
      const r=await fetch(SUPA_URL+"?select=*&order=user_id.desc",{headers:{apikey:KEY,Authorization:"Bearer "+KEY}});
      const d=await r.text(); return res.status(r.status).send(d);
    }
    if(req.method==='POST'){
      const r=await fetch(SUPA_URL,{method:"POST",headers:{apikey:KEY,Authorization:"Bearer "+KEY,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(req.body)});
      const d=await r.text(); return res.status(r.status).send(d);
    }
    return res.status(405).send("Method not allowed");
  }catch(e){return res.status(500).send(e.message);}
}
