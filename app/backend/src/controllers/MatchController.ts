import { Request, Response } from 'express';
import IMatch from '../Interfaces/matches/IMatch';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response):Promise<Response> {
    const isInProgressFilter = req.query.inProgress;
    const serviceResponse = await this.matchService.getAllMatches(isInProgressFilter as string);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;
    const serviceResponse = await this.matchService.updateMatch(Number(id), data as IMatch);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const matchData = req.body;
    const serviceResponse = await this.matchService.createMatch(matchData);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
