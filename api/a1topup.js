<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PAYQUICKPAY - Recharge Zone - LIVE 505942</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f1f5f9}
.top{background:#fff;border-bottom:1px solid #e2e8f0;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100}
.top b{color:#0F172A}.top .live{background:#2563eb;color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700}
.box{max-width:1200px;margin:16px auto;padding:0 16px}
.cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}
@media(max-width:700px){.cards3{grid-template-columns:1fr}}
.c{background:#fff;border-radius:12px;padding:16px;border:1px solid #e2e8f0}
.c b{font-size:11px;color:#64748b}.c span{font-size:20px;font-weight:700;display:block;margin-top:4px}
.main2{display:grid;grid-template-columns:380px 1fr;gap:16px}
@media(max-width:900px){.main2{grid-template-columns:1fr}}
label{font-size:11px;font-weight:600;color:#334155;margin-top:10px;display:block;margin-bottom:4px}
input,select{width:100%;padding:12px 12px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;background:#fff;outline:none}
input:focus,select:focus{border-color:#2563eb}
.btn{border:none;border-radius:8px;padding:12px;font-weight:700;cursor:pointer;font-size:13px}
.btn-o{background:#fff;border:1px solid #e2e8f0;color:#0F172A}.btn-blue{background:#2563eb;color:#fff;width:100%;margin-top:12px;padding:14px;font-size:14px}
.detect{background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;padding:8px;margin-top:8px;font-size:11px;display:none}.detect.show{display:block}
.plans3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
@media(max-width:600px){.plans3{grid-template-columns:repeat(2,1fr)}}
.pl{border:1px solid #f1f5f9;border-radius:8px;padding:10px;cursor:pointer;background:#fff}.pl:hover{border-color:#2563eb}
.pl b{font-size:14px;color:#0F172A}.pl span{font-size:11px;color:#64748b;display:block}.pl small{font-size:10px;color:#94a3b8}
.msg{margin-top:10px;padding:10px;border-radius:8px;font-size:12px;font-weight:600;display:none;text-align:center}.msg.show{display:block}
.msg-ok{background:#dcfce7;color:#166534}.msg-er{background:#fee2e2;color:#991b1b}.msg-in{background:#dbeafe;color:#1e40af}
table{width:100%;border-collapse:collapse}th{font-size:10px;color:#64748b;padding:8px 4px;text-align:left;border-bottom:1px solid #f1f5f9}td{font-size:11px;padding:8px 4px;border-bottom:1px solid #f8fafc}
.badge{padding:2px 6px;border-radius:10px;font-size:10px;font-weight:700}.ok{background:#dcfce7;color:#166534}
</style>
</head>
<body>
<div class="top"><div><span class="live">LIVE</span> <b>PAYQUICKPAY</b> <small style="color:#64748b">• Recharge Zone • 505942 • A1 Style</small><br><small id="rid" style="color:#94a3b8;font-size:11px">SINU • Retailer • LIVE 505942</small></div><div style="display:flex;gap:6px"><button onclick="checkBal()" class="btn btn-o" style="padding:6px 10px">Balance</button><button onclick="logout()" class="btn btn-o" style="padding:6px 10px">Logout</button></div></div>

<div class="box">
<div class="cards3">
<div class="c"><b>MY WALLET</b><span id="wallet" style="color:#0F172A">Rs 100</span><small>NILU → SINU</small></div>
<div class="c"><b>A1 WALLET • LIVE</b><span id="a1bal" style="color:#16a34a">Rs 1000.00</span><small id="conn">✅ 505942 Connected</small></div>
<div class="c"><b>EARNINGS</b><span id="comm" style="color:#ea580c">Rs 0.00</span><small><span id="cnt">0</span> Transactions</small></div>
</div>

<div class="main2">
<div class="c">
<div style="background:#2563eb;color:#fff;padding:10px 12px;border-radius:8px;margin:-16px -16px 12px -16px"><i class="fa-solid fa-mobile-screen-button"></i> <b style="color:#fff">Mobile recharge</b> <small style="color:#bfdbfe">Prepaid</small></div>
<label>Mobile number</label>
<input id="num" placeholder="10-digit mobile number" maxlength="10" type="tel" oninput="onMob(this.value)">
<div id="detectBox" class="detect"><i class="fa-solid fa-bolt" style="color:#2563eb"></i> <span id="detectText">RC • Odisha 23 • Prepaid</span></div>
<label>Operator</label>
<select id="op" onchange="showPlans()"><option value="RC">RC • Prepaid • 0.50%</option><option value="A">A • Prepaid • 0.80%</option><option value="V">V • Prepaid • 2.30%</option><option value="I">I • Prepaid • 2.30%</option><option value="BT">BT • 2.90%</option><option value="ATV">ATV • DTH • 3.00%</option><option value="DTV">DTV • DTH • 3.00%</option><option value="TPCODL">TPCODL • Electricity</option></select>
<label>Amount</label>
<input id="amt" type="number" placeholder="Enter amount or pick a plan">
<button onclick="doRecharge()" class="btn btn-blue"><i class="fa-solid fa-bolt"></i> Recharge</button>
<div id="msg" class="msg"></div>
</div>

<div class="c">
<div style="background:#2563eb;color:#fff;padding:10px 12px;border-radius:8px;margin:-16px -16px 12px -16px"><i class="fa-solid fa-list"></i> <b style="color:#fff">Browse plans</b> <small style="color:#bfdbfe">Enter a mobile number to see its plans</small></div>
<div style="display:flex;gap:6px"><select id="circle" style="flex:1"><option value="23">Select circle • Odisha 23</option><option value="2">West Bengal 2</option><option value="5">Delhi 5</option><option value="4">Maharashtra 4</option></select><input id="searchPlan" placeholder="Search amount, data, validity" style="flex:1"></div>
<div id="planGrid" class="plans3"><div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:#94a3b8"><i class="fa-solid fa-mobile-screen-button" style="font-size:24px;display:block;margin-bottom:8px"></i>Plans will appear here<br><small>Enter the mobile number - Operator and circle are detected automatically</small></div></div>
</div>
</div>

<div class="c" style="margin-top:16px">
<b style="font-size:12px;color:#0F172A">Recent Transactions</b>
<div style="margin-top:8px;overflow:auto;max-height:260px">
<table><thead><tr><th>Date</th><th>Service</th><th>Number</th><th>Amount</th><th>TxID</th><th>Status</th></tr></thead><tbody id="hist"><tr><td colspan=6 style="text-align:center;color:#94a3b8;padding:20px">No transactions yet</td></tr></tbody></table>
</div>
</div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script>
var firebaseConfig={apiKey:"AIzaSyCZCNT1ljpjIIxDUCEHoAQPJFR2Zd7OOI",authDomain:"payquickpay-487ef.firebaseapp.com",projectId:"payquickpay-487ef",storageBucket:"payquickpay-487ef.firebasestorage.app",messagingSenderId:"368108778411",appId:"1:368108778411:web:03dcbc47e46568d51b58ee"};
try{ firebase.initializeApp(firebaseConfig); var db=firebase.firestore(); }catch(e){ var db=null; console.log('Firebase init error', e); }

const plansDB={RC:[{a:19,d:'1GB • 1 Day',v:'1D'},{a:29,d:'2.5GB • 2 Days',v:'2D'},{a:149,d:'1GB/Day • Unlimited',v:'20D'},{a:199,d:'1.5GB/Day • Unlimited',v:'23D'},{a:299,d:'2GB/Day • Unlimited',v:'28D'},{a:399,d:'2.5GB/Day + OTT',v:'28D'}],A:[{a:19,d:'1GB • 1 Day',v:'1D'},{a:149,d:'1GB/Day',v:'20D'},{a:199,d:'1.5GB/Day',v:'24D'},{a:299,d:'1.5GB/Day • Unlimited',v:'28D'}],V:[{a:19,d:'1GB • 1 Day',v:'1D'},{a:149,d:'1GB/Day',v:'18D'},{a:199,d:'1.5GB/Day',v:'21D'},{a:299,d:'1.5GB/Day',v:'28D'}],default:[{a:10,d:'Topup',v:'NA'},{a:100,d:'Full Talktime',v:'NA'},{a:149,d:'Unlimited',v:'20D'},{a:199,d:'Unlimited',v:'28D'},{a:299,d:'Unlimited',v:'28D'}]};

function detectLocal(num){
 if(!num||num.length<4) return {op:'RC',circle:'23',name:'RC Odisha'};
 let op='RC', circle='23', name='RC Odisha';
 if(num.startsWith('943')||num.startsWith('944')){ op='BT'; name='BT Odisha'; }
 if(num.startsWith('8763')||num.startsWith('8018')||num.startsWith('7908')||num.startsWith('6370')||num.startsWith('7008')||num.startsWith('9437')||num.startsWith('9438')||num.startsWith('8018')){ op='RC'; circle='23'; name='RC Odisha'; }
 return {op:op, circle:circle, name:name};
}

async function detectReal(number){
 try{
   let res=await fetch('/api/a1topup?action=operator_lookup&number='+number);
   let data=await res.json();
   if(data && data.op){ return {op:data.op, circle:data.circle||'23', name:'RC Odisha'}; }
 }catch(e){}
 return detectLocal(number);
}

async function onMob(val){
 let num=val.replace(/\D/g,'').substring(0,10);
 let inp=document.getElementById('num');
 if(inp) inp.value=num;
 let box=document.getElementById('detectBox');
 if(box) box.classList.add('show');
 let txt=document.getElementById('detectText');
 if(num.length>=2 && txt) txt.innerText='Detecting... '+num;
 if(num.length>=4){
   let d=await detectReal(num);
   if(txt) txt.innerText='✅ '+d.op+' • Odisha 23 • Prepaid • Auto Detected • '+num;
   let opSel=document.getElementById('op'); if(opSel) opSel.value=d.op;
   let circleSel=document.getElementById('circle'); if(circleSel) circleSel.value=d.circle;
   showPlans();
 }
 if(num.length===10){
   let d=await detectReal(num);
   if(txt) txt.innerText='✅ '+d.op+' • Odisha 23 • Prepaid • Ready to Recharge • '+num;
 }
}

function showPlans(){
 let opEl=document.getElementById('op'); let op=opEl?opEl.value:'RC';
 let list=plansDB[op]||plansDB.default;
 let h='';
 list.forEach(function(p){
   h+='<div class="pl" onclick="pick('+p.a+')"><b>₹'+p.a+'</b><span>'+p.d+'</span><small>'+p.v+' • Click to fill</small></div>';
 });
 let grid=document.getElementById('planGrid');
 if(grid) grid.innerHTML=h;
}

function pick(a){ let amtEl=document.getElementById('amt'); if(amtEl) amtEl.value=a; m('₹'+a+' selected - Amount filled','ok'); }
function logout(){ try{ localStorage.removeItem('retailer'); }catch(e){} location.href='index.html'; }
function m(t,type){ let e=document.getElementById('msg'); if(!e) return; e.className='msg show msg-'+type; e.innerText=t; e.style.display='block'; }

async function load(){
 let id='SINU'; try{ id=localStorage.getItem('retailer')||'SINU'; }catch(e){}
 let ridEl=document.getElementById('rid'); if(ridEl) ridEl.innerText=id+' • Retailer • LIVE 505942 • A1 Style';
 try{
   if(db){
     let s=await db.collection('retailers').where('user_id','==',id).get();
     let w=0; s.forEach(function(d){ w=d.data().wallet||0; });
     let walletEl=document.getElementById('wallet'); if(walletEl) walletEl.innerText='Rs '+w;
   }
 }catch(e){}
 try{
   let histRaw=localStorage.getItem('recharge_history')||'[]';
   let h=JSON.parse(histRaw).filter(function(r){return r.retailer_id==id;});
   let c=0; h.forEach(function(r){ c+=Number(r.commission||0); });
   let commEl=document.getElementById('comm'); if(commEl) commEl.innerText='Rs '+c.toFixed(2);
   let cntEl=document.getElementById('cnt'); if(cntEl) cntEl.innerText=h.length;
   if(h.length>0){
     let html=''; h.slice(-20).reverse().forEach(function(r){
       html+='<tr><td>'+r.date+'</td><td>'+r.operator_code+'</td><td><b>'+r.customer_no+'</b></td><td>Rs '+r.amount+'</td><td><small>'+(r.txid||'').substring(0,12)+'</small></td><td><span class="badge ok">Success</span></td></tr>';
     });
     let histEl=document.getElementById('hist'); if(histEl) histEl.innerHTML=html;
   }
 }catch(e){}
 showPlans();
}

async function checkBal(){
 let a1El=document.getElementById('a1bal'); if(a1El) a1El.innerText='Checking...';
 try{
   let res=await fetch('/api/a1topup?action=balance');
   let t=await res.text();
   if(a1El) a1El.innerText='Rs '+t.substring(0,10)+' LIVE';
   let connEl=document.getElementById('conn'); if(connEl) connEl.innerText='✅ 505942 Connected • A1 Style';
   m('Connected • Rs '+t.substring(0,10),'ok');
 }catch(e){ m('Error '+e.message,'er'); }
}

async function doRecharge(){
 let id='SINU'; try{ id=localStorage.getItem('retailer')||'SINU'; }catch(e){}
 let numEl=document.getElementById('num'); let amtEl=document.getElementById('amt');
 let num=numEl?numEl.value.trim():''; let amt=amtEl?amtEl.value.trim():'';
 let opEl=document.getElementById('op'); let circleEl=document.getElementById('circle');
 let op=opEl?opEl.value:'RC'; let circle=circleEl?circleEl.value:'23';
 let per=0.5; try{ per=Number(opEl.options[opEl.selectedIndex].getAttribute('data-comm')||0.5); }catch(e){}
 if(!num||!amt){ m('Enter number & amount','er'); return; }
 if(num.length!=10){ m('10 digit number','er'); return; }
 let orderId='PAY'+Date.now();
 m('Processing '+num+' Rs '+amt+' • '+op+' • '+circle+' • Order '+orderId+' • A1 505942...','in');
 try{
   let docId=null,w=100;
   if(db){
     let s=await db.collection('retailers').where('user_id','==',id).get();
     s.forEach(function(d){ docId=d.id; w=d.data().wallet||0; });
   }
   if(w==0) w=100;
   if(w<Number(amt)){ m('Low wallet Rs '+w,'er'); return; }
   let url='/api/a1topup?action=recharge&operatorcode='+op+'&number='+num+'&amount='+amt+'&orderid='+orderId+'&circlecode='+circle;
   let res=await fetch(url); let text=await res.text();
   let status='Failed',txid='',opid='';
   try{ let j=JSON.parse(text); status=j.status||'Failed'; txid=j.txid||''; opid=j.opid||''; }catch(e){
     let p=text.split(','); if(p.length>=3){ txid=p[0]; status=p[1]; opid=p[2]; }else if(text.toLowerCase().includes('success')){ status='Success'; txid='TX'+Date.now(); opid='OP'+Date.now(); }
   }
   if(status.toLowerCase().includes('success')){
     let comm=Number(amt)*per/100;
     if(db && docId){ try{ await db.collection('retailers').doc(docId).update({wallet:w-Number(amt)+comm}); }catch(e){} }
     let data={retailer_id:id,operator_code:op,customer_no:num,amount:amt,commission:comm.toFixed(2),orderid:orderId,txid:txid,opid:opid,status:'Success',date:new Date().toLocaleString()};
     try{
       let hist=JSON.parse(localStorage.getItem('recharge_history')||'[]'); hist.push(data); localStorage.setItem('recharge_history',JSON.stringify(hist));
     }catch(e){}
     m('✅ Success Tx:'+txid+' Op:'+opid+' • '+num+' Rs '+amt+' • Comm Rs '+comm.toFixed(2),'ok');
     load(); checkBal();
   }else{ m('❌ Failed: '+text.substring(0,300),'er'); }
 }catch(e){ m('Error '+e.message,'er'); }
}

window.onload=function(){ load(); checkBal(); console.log('PAYQUICKPAY A1 Style Loaded - 505942 LIVE'); };
</script>
</body>
</html>
