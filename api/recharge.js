// Recharge re bi same logic - HTML check kara
const text = await response.text();
if (text.includes("<!doctype") || text.includes("404")) {
  return res.json({ error: "A1 Recharge URL Wrong - 404", raw: text.substring(0,100) });
}
