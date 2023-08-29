import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel from '../models/LeaderbordModel';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
    private leaderboardModel: LeaderboardModel = new LeaderboardModel(),
  ) {}

  public async getHomeTeamsStandings(): Promise<ServiceResponse<ILeaderboard[]>> {
    const dbData = await this.leaderboardModel.findAllHomeTeamStanding();
    return { status: 'successful', data: dbData as unknown as ILeaderboard[] };
  }
}
