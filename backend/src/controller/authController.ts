import { Request, Response, NextFunction } from 'express';
import { sendSignInEmail } from "../util/email.js";
import geoip from 'geoip-lite';
import passport from 'passport';

//Login user
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred during login', error: err });
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || 'Login failed' });
    }

    // Log the user in and create session
    req.logIn(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login session error', error: err });
      }

      // Get user's IP address
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // Get user's location using geoip-lite
      const geo = geoip.lookup(ip as string);
      const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown location';
       
      // Send email notification for sign-in
      try {
        await sendSignInEmail({
          to: user.email,
          subject: 'New Sign-in Notification',
          text: `You have signed in from: ${location}, IP: ${ip}. If this was not you, please contact support.`,
        });
      } catch (emailError) {
        return res.status(500).json({ message: 'Email notification error', error: emailError });
      }

      return res.status(200).json({
        message: 'Login successful',
        user,
      });
    });
  })(req, res, next);
};


//Logout user
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout error', error: err });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
  }
