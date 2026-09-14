export default async function handler(req, res){
  const { mobile, otp } = req.query;
  const API_KEY = "a8BPu1r2hO79EkbdpUIFAvSQw4xKimZtDRTGCgYy53MqJWzVcs8EJe0GSlVLgjuyKHax6pZIio294tCs";
  
  if(!mobile || !otp){
    return res.status(400).json({ error: "Mobile & OTP darkar" });
  }

  try{
    const url = https://www.fast2sms.com/dev/bulkV2?authorization=${API_KEY}&variables_values=${otp}&route=otp&numbers=${mobile};
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json({ success: true, data: data });
  } catch(e){
    return res.status(500).json({ success: false, error: e.message });
  }
}
