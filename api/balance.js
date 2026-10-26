export default async function handler(req, res) {
  try {
    const apiUrl = "https://business.aitopup.com/Admin/RechargeAPI.aspx?UserID=505942&Password=605254&MobileNo=7908824917&Message=BAL$605254";
    const response = await fetch(apiUrl);
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(text);
  } catch (err) {
    return res.status(200).send("API Error: " + err.message + " - But ID 505942 Live");
  }
}
