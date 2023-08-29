import ILeaderboard from './ILeaderboard';

export interface ILeaderboardModel {
  findAllHomeTeamStanding(): Promise<ILeaderboard[]>,
  findAllAwayTeamStanding(): Promise<ILeaderboard[]>
  findAllTeamStamStanding(): Promise<ILeaderboard[]>
}
