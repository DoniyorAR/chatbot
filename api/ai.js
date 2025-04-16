import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const OPENAI_API_KEY = "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";

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ message: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'AI response not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error connecting to OpenAI API' });
  }
}
