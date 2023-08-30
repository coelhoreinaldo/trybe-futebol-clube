import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { NewEntity } from '../Interfaces';

export default class implements IMatchModel {
  private model = SequelizeMatch;

  public async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  public async findById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  public async findByProgress(inProgress: boolean): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  public async finishMatch(id: IMatch['id']): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async update(id: number, data: Partial<IMatch>): Promise<IMatch | null> {
    await this.model.update(data, { where: { id } });
    const updatedMatch = await this.findById(id);
    return updatedMatch;
  }

  public async create(matchData: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.model.create(matchData);

    return dbData;
  }
}
