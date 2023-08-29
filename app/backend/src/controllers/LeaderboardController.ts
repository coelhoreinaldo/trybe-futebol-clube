import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderbordService';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) {}

  public async getHomeTeamsStandings(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.getHomeTeamsStandings();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayTeamsStandings(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.getAwayTeamsStandings();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
