export default async function handler(req, res) {
  try {
    const USERNAME = "505942";
    const PWD = "605254"; // Tuma real password - screenshot ru milila!

    // A1 ra sahi Balance URL - pwd use kariba!
    const urls = [
      `https://business.a1topup.com/recharge/api/balance?username=${USERNAME}&pwd=${PWD}`,
      `https://business.a1topup.com/api/balance?username=${USERNAME}&pwd=${PWD}`,
      `https://business.a1topup.com/recharge/balance?username=${USERNAME}&pwd=${PWD}`,
      `https://business.a1topup.com/balance?username=${USERNAME}&pwd=${PWD}`
    ];

    for (let url of urls) {
      try {
        const r = await fetch(url);
        const text = await r.text();
        
        // HTML 404 skip kara
        if (text.includes("<html>") || text.includes("<!doctype") || text.includes("404")) continue;

        // SUCCESS! - Plain text pathao - undefined au asiba nahi
        console.log("Balance Success:", text);
        return res.status(200).send(text); // Eita important - send() not json()!
        
      } catch (e) { continue; }
    }

    return res.status(200).send("A1 Balance URL not found - Contact A1");

  } catch (e) {
    return res.status(200).send("Error: " + e.message);
  }
}
