import { NewEntity } from '../Interfaces';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
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

  public async createMatch(matchData: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = matchData;
    if (homeTeamId === awayTeamId) {
      return { status: 'unprocessableEntity',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const team1 = await this.teamModel.findById(homeTeamId);
    const team2 = await this.teamModel.findById(awayTeamId);
    if (!team1 || !team2) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.create(matchData);

    return { status: 'created', data: newMatch as unknown as IMatch };
  }
}
