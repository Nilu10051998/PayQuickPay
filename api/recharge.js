import { HttpsProxyAgent } from 'https-proxy-agent';
export default async function handler(req, res) {
  const { number, amount, operatorcode, circlecode, orderid } = req.query;
  const username = process.env.A1_USER;
  const pwd = process.env.A1_PWD;
  const agent = process.env.PROXY_URL ? new HttpsProxyAgent(process.env.PROXY_URL) : undefined;
  const base = `username=${username}&pwd=${pwd}&number=${number}&amount=${amount}&operatorcode=${operatorcode}&circlecode=${circlecode}&orderid=${orderid}&format=json`;
  const urls = [
    `https://business.a1topup.com/recharge/recharge?${base}`,
    `https://business.a1topup.com/recharge/doRecharge?${base}`,
    `https://business.a1topup.com/recharge/api?${base}`,
    `https://business.a1topup.com/recharge?${base}`,
    `https://business.a1topup.com/api/recharge?${base}`,
    `https://business.a1topup.com/recharge/rechargeAPI?${base}`,
    `https://business.a1topup.com/recharge/process?${base}`,
    `https://business.a1topup.com/recharge/do?${base}`
  ];
  let results = [];
  for (let url of urls) {
    try {
      const r = await fetch(url, { agent });
      const t = (await r.text()).substring(0, 200);
      results.push({ url: url.split('?')[0], status: r.status, resp: t });
    } catch(e) { results.push({ url, err: e.message }); }
  }
  return res.status(200).json({ test: results });
}
