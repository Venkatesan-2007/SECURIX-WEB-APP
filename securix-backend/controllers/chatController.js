import axios from 'axios';

export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    // Try using v1 endpoint with gemini-1.5-pro which may have better free tier support
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!GEMINI_API_KEY) {
      console.error('❌ Gemini API key not found in .env file');
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    console.log('✓ API Key loaded, sending to Gemini...');

    const systemPrompt = `You are Securix's AI Assistant - a helpful support bot for a cybersecurity services company. 
Securix offers:
- Penetration Testing
- Cloud Security Auditing
- Digital Forensics

Guidelines:
1. Be professional and helpful
2. If asked about services, mention our three main offerings
3. If asked about contact, provide: care.securix@gmail.com
4. Keep responses concise (2-3 sentences max)
5. For complex issues, offer to escalate to a human agent
6. Stay focused on Securix services - don't answer unrelated questions`;

    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt + "\n\nUser Query: " + message }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 150,
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const botMessage = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!botMessage) {
      console.error('❌ No text in Gemini response:', response.data);
      return res.status(500).json({ error: 'Invalid response from Gemini API' });
    }

    console.log('✓ Gemini response received successfully');
    res.json({ reply: botMessage });
  } catch (error) {
    console.error('❌ Gemini API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle quota exceeded with fallback response
    if (error.response?.status === 429) {
      const fallbackResponse = `I'm currently experiencing high demand and can't process your request right now. 

However, I can tell you that Securix offers:
- **Penetration Testing** - Comprehensive security testing
- **Cloud Security Auditing** - Secure your cloud infrastructure  
- **Digital Forensics** - Investigation and forensic analysis

Please contact us at **care.securix@gmail.com** or try again in a few moments. Thank you for your patience!`;
      
      return res.json({ reply: fallbackResponse });
    }

    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.response?.data?.error?.message || error.message
    });
  }
};
