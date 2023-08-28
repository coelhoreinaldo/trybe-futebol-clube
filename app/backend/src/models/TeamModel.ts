import ITeam from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class implements ITeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const dbData = this.model.findAll();
    return dbData;
  }

  public async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}
