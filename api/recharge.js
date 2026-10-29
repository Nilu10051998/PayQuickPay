// FINAL FIX - Recharge API
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get("number");
    const operatorcode = searchParams.get("operatorcode");
    const circlecode = searchParams.get("circlecode");
    const amount = searchParams.get("amount");
    const orderid = searchParams.get("orderid") || "PAY" + Date.now();

    const USERNAME = "505942";
    const PWD = "605254";

    const a1Url = `https://business.a1topup.com/recharge/api?username=${USERNAME}&pwd=${PWD}&circlecode=${circlecode}&operatorcode=${operatorcode}&number=${number}&amount=${amount}&orderid=${orderid}`;
    
    const r = await fetch(a1Url, { cache: "no-store" });
    const text = await r.text();
    
    // A1 single quote JSON deuchi - double quote kara
    let cleanText = text.replace(/'/g, '"');
    
    // Text ru JSON banai return kara - Frontend JSON expect karuchi!
    return new Response(JSON.stringify({ 
      raw: text,
      message: text,
      clean: cleanText,
      success: text.toLowerCase().includes("success") || text.toLowerCase().includes("txid"),
      orderid: orderid
    }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (e) {
    return new Response(JSON.stringify({ raw: "Error: " + e.message, message: "Error: " + e.message, success: false }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
