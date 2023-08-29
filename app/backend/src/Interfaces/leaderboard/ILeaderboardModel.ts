import ILeaderboard from './ILeaderboard';

export interface ILeaderboardModel {
  findAllHomeTeamStanding(): Promise<ILeaderboard[]>,
}
