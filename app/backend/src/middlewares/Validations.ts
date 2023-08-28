import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../validations/schemas';
import JWT from '../utils/JWT';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const validEmail = /\S+@\S+\.\S+/;
    if (!validEmail.test(req.body.email) || req.body.password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const verifyToken = JWT.verify(token);
    if (verifyToken === 'Token must be a valid token') {
      return res.status(401).json({ message: verifyToken });
    }

    req.body.userData = verifyToken;
    next();
  }
}

export default Validations;
