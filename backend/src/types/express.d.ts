import { User } from '../model/schema';

declare global {
  namespace Express {
    // Extend the Express Request interface
    interface Request {
      user?: any; // This allows TypeScript to recognize req.user
    }
  }
}
