import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: LeaderboardModel = new LeaderboardModel(),
  ) {}

  public async getHomeTeamsStandings(): Promise<ServiceResponse<ILeaderboard[]>> {
    const dbData = await this.leaderboardModel.findAllHomeTeamsStandings();
    return { status: 'successful', data: dbData };
  }

  public async getAwayTeamsStandings(): Promise<ServiceResponse<ILeaderboard[]>> {
    const dbData = await this.leaderboardModel.findAllAwayTeamsStandings();
    return { status: 'successful', data: dbData };
  }

  public async getTeamsStandings(): Promise<ServiceResponse<ILeaderboard[]>> {
    const dbData = await this.leaderboardModel.findAllTeamsStandings();
    return { status: 'successful', data: dbData };
  }
}
