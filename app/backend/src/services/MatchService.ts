import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
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

  public async finishMatch(id: IMatch['id']): Promise<ServiceResponse<ServiceMessage>> {
    const foundMatch = await this.matchModel.findById(id);
    if (!foundMatch) {
      return { status: 'notFound', data: { message: 'Match not found' } };
    }

    if (!foundMatch.inProgress) {
      return { status: 'invalidData', data: { message: 'Match already finished' } };
    }

    await this.matchModel.finishMatch(id);
    return { status: 'successful', data: { message: 'Finished' } };
  }

  public async updateMatch(id: IMatch['id'], bodyData: IMatch)
    : Promise<ServiceResponse<IMatch | null>> {
    const foundMatch = await this.matchModel.findById(id);
    if (!foundMatch) {
      return { status: 'notFound', data: { message: 'Match not found' } };
    }

    if (!foundMatch.inProgress) {
      return { status: 'invalidData', data: { message: 'Match already finished' } };
    }

    const updatedMatch = await this.matchModel.update(id, bodyData);

    return { status: 'successful', data: updatedMatch };
  }
}
