import * as bcrypt from 'bcryptjs';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { ILogin } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import JWT from '../utils/JWT';
import Token from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async login(loginData:ILogin): Promise<ServiceResponse<ServiceMessage | Token>> {
    const foundUser = await this.userModel.findByEmail(loginData.email);
    if (!foundUser || !bcrypt.compareSync(loginData.password, foundUser.password)) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }

    const { email, password } = loginData;
    const token = this.jwtService.sign({ email, password });

    return { status: 'successful', data: { token } };
  }
}
