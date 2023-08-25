import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService: TeamService = new TeamService(),
  ) {}

  public async getAllTeams(req: Request, res: Response):Promise<Response> {
    const serviceResponse = await this.teamService.getAllTeams();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response):Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.teamService.getTeamById(id);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
