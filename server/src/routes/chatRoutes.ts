import { Router, Response } from 'express';
import OpenAI from 'openai';
import { AuthenticatedRequest, authMiddleware } from '../middleware/authMiddleware';
import admin from 'firebase-admin';

const router = Router();

let openai: OpenAI | null = null;
let isHealthOK = false;

const initializeOpenAI = () => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found in environment variables.');
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('OpenAI client initialized successfully.');
    isHealthOK = true;
  } catch (error) {
    console.error('Error initializing OpenAI:', error);
  }
};

// Chat endpoint
router.post('/chat', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!openai) {
    res.status(500).json({ error: 'OpenAI client not initialized' });
    return;
  }

  try {
    const { message } = req.body;
    const userId = req.user?.uid;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant focused on providing Christian guidance and support."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    res.json({ response: aiResponse });
  } catch (error: any) {
    console.error('Error from OpenAI:', error.message);
    res.status(500).json({ error: 'Error processing your request', details: error.message });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  const status = {
    server: 'running',
    openai: openai ? 'configured' : 'not configured',
    firebase: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 ? 'configured' : 'not configured'
  };
  
  res.json(status);
});

export default router;