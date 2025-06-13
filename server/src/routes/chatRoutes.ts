import { Router } from 'express';
import OpenAI from 'openai';
import { authMiddleware, AuthenticatedRequest } from '../middleware/authMiddleware';

// Initialize OpenAI with error handling
let openai: OpenAI | null = null;

try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('OpenAI client initialized successfully');
  } else {
    console.warn('OpenAI API key not found. Please set OPENAI_API_KEY environment variable.');
  }
} catch (error) {
  console.error('Error initializing OpenAI client:', error);
}

const router = Router();

router.post('/chat', authMiddleware, async (req: AuthenticatedRequest, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!openai) {
    return res.status(500).json({ 
      error: 'AI service not configured. Please check server configuration.' 
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are ChristAI, a helpful AI assistant focused on providing thoughtful, respectful, and informative responses. You aim to be helpful while maintaining a friendly and professional tone.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    
    if (error.code === 'insufficient_quota') {
      res.status(500).json({ 
        error: 'AI service quota exceeded. Please try again later.' 
      });
    } else if (error.code === 'invalid_api_key') {
      res.status(500).json({ 
        error: 'AI service configuration error. Please contact support.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to get response from AI service. Please try again.' 
      });
    }
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