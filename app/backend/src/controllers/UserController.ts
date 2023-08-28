import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const loginData = req.body;
    const serviceResponse = await this.userService.login(loginData);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.userData;
    const serviceResponse = await this.userService.getRole(email);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
