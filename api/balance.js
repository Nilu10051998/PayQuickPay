export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const USERNAME = process.env.A1_USERNAME || "505942";
  const PASSWORD = process.env.A1_PASSWORD || "TUMA_PASSWORD_ETHI_LEKHA";
  
  // A1 ra sabu possible URL - gote fail hele arek ta try kariba
  const A1_URLS = [
    `https://business.a1topup.com/api/balance?username=${USERNAME}&password=${PASSWORD}`,
    `https://business.a1topup.com/recharge/api/balance?username=${USERNAME}&password=${PASSWORD}`,
    `https://business.a1topup.com/a1api/balance?username=${USERNAME}&password=${PASSWORD}`,
    `https://business.a1topup.com/api/getBalance?username=${USERNAME}&password=${PASSWORD}`
  ];

  for (let apiUrl of A1_URLS) {
    try {
      console.log("Trying:", apiUrl);
      const response = await fetch(apiUrl, { method: 'GET', timeout: 10000 });
      const text = await response.text();

      // Jadi HTML 404 asila - mane URL bhul - next URL try kara
      if (text.toLowerCase().includes("<!doctype") || text.toLowerCase().includes("<html>") || text.includes("404")) {
        console.log("HTML Error for:", apiUrl);
        continue; // next URL ku jiba
      }

      // Jadi thik response asila (Balance: 1000)
      return res.status(200).json({ 
        success: true, 
        balance: text.trim(),
        url_used: apiUrl 
      });

    } catch (e) {
      console.log("Error trying", apiUrl, e.message);
      continue;
    }
  }

  // Sabu URL fail heigala
  return res.status(500).json({
    success: false,
    error: "A1 Balance URL 404 - A1 has changed API link",
    solution: "Contact A1 support and ask for correct Live Balance API URL for account 505942",
    your_current_ips: "0.0.0.0,32.200.109.55,76.76.21.21 is whitelisted"
  });
}
