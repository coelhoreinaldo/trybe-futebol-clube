import { IUserModel } from '../Interfaces/users/IUserModel';
import { IUser } from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class implements IUserModel {
  private model = SequelizeUser;

  public async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: {
      email,
    } });

    return dbData;
  }
}
