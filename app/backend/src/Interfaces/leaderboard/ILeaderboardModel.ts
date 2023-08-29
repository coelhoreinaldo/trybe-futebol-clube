import ILeaderboard from './ILeaderboard';

export interface ILeaderboardModel {
  findAllHomeTeamsStandings(): Promise<ILeaderboard[]>,
  findAllAwayTeamsStandings(): Promise<ILeaderboard[]>
  findAllTeamsStandings(): Promise<ILeaderboard[]>
}
