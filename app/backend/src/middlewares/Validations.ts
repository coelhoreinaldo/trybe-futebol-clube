import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../validations/schemas';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    next();
  }
}

export default Validations;
