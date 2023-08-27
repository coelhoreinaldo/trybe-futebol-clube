import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(isInProgressFilter: string): Promise<ServiceResponse<IMatch[]>> {
    if (isInProgressFilter) {
      const isInProgress = isInProgressFilter === 'true';
      const inProgressMatches = await this.matchModel.findByProgress(isInProgress);
      return { status: 'successful', data: inProgressMatches };
    }
    const allMatches = await this.matchModel.findAll();
    return { status: 'successful', data: allMatches };
  }
}
