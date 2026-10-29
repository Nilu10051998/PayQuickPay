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
    
    const r = await fetch(a1Url);
    const text = await r.text();
    
    return new Response(text, { status: 200, headers: { "Content-Type": "text/plain" } });
  } catch (e) {
    return new Response("Recharge Error: " + e.message, { status: 500 });
  }
}
