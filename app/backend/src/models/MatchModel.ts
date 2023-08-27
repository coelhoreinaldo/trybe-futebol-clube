import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class implements IMatchModel {
  private model = SequelizeMatch;

  public async findAll(): Promise<IMatch[]> {
    const dbData = this.model.findAll(
      {
        include: [{
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        }, {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
      },
    );
    return dbData;
  }
}
