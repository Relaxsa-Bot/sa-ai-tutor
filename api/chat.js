export default async function handler(req, res) {
  // 1. Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // 2. Verify API key
  if (!process.env.DEEPSEEK_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    // 3. Call DeepSeek
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: req.body.messages || [],
        temperature: 0.7
      })
    });

    // 4. Forward response exactly
    const data = await response.json();
    return res.status(response.status).json(data);
    
  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
      hint: "Check Vercel logs"
    });
  }
                                }
