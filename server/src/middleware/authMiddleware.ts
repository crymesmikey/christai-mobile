import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

// Extend the Express Request interface to include a 'user' property
export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying auth token:', error);
    res.status(403).send('Forbidden: Invalid token');
    return;
  }
}; 