// api/proxy.js (สำหรับโปรเจกต์ Node.js บน Vercel)
export default async function handler(req, res) {
  // อนุญาต CORS ให้เว็บของคุณเรียกใช้งานได้
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const GAS_URL = "ใส่_URL_Web_App_ของ_Google_Apps_Script_คุณตรงนี้";
      
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(req.body),
        redirect: 'follow'
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: "Error", message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
