import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel from '../models/LeaderbordModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: LeaderboardModel = new LeaderboardModel(),
  ) {}

  public async getHomeTeamsStandings(): Promise<ServiceResponse<ILeaderboard[]>> {
    const dbData = await this.leaderboardModel.findAllHomeTeamStanding();
    return { status: 'successful', data: dbData };
  }

  public async getAwayTeamsStandings(): Promise<ServiceResponse<ILeaderboard[]>> {
    const dbData = await this.leaderboardModel.findAllAwayTeamStanding();
    return { status: 'successful', data: dbData };
  }

  public async getTeamsStandings(): Promise<ServiceResponse<ILeaderboard[]>> {
    const dbData = await this.leaderboardModel.findAllAwayTeamStanding();
    return { status: 'successful', data: dbData };
  }
}
