import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../validations/schemas';

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
}

export default Validations;
