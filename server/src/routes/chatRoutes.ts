import { Router } from 'express';
import OpenAI from 'openai';
import { authMiddleware, AuthenticatedRequest } from '../middleware/authMiddleware';

// IMPORTANT: Configure your OpenAI API key.
// It's best to use an environment variable for this.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = Router();

router.post('/chat', authMiddleware, async (req: AuthenticatedRequest, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or 'gpt-4' if you have access
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

export default router; 