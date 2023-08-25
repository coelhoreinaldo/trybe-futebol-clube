import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'successful', data: allTeams };
  }

  public async getTeamById(id:number): Promise<ServiceResponse<ITeam>> {
    const foundTeam = await this.teamModel.findById(id);
    if (!foundTeam) return { status: 'notFound', data: { message: `Team ${id} not found` } };

    return { status: 'successful', data: foundTeam };
  }
}
