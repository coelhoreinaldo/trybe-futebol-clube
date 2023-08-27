import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private teamModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.teamModel.findAll();
    return { status: 'successful', data: allMatches };
  }
}
