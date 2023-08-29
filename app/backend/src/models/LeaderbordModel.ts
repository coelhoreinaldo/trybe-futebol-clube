import { QueryTypes } from 'sequelize';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import db from '../database/models';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';

const homeTeamStandingsQuery = `
  SELECT t.team_name AS name,
      SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
               WHEN m.home_team_goals = m.away_team_goals THEN 1
               ELSE 0 END) AS totalPoints,
      COUNT(m.id) AS totalGames,
      SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
      SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
      SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
      SUM(m.home_team_goals) AS goalsFavor,
      SUM(m.away_team_goals) AS goalsOwn
  FROM teams AS t
  INNER JOIN matches AS m
  ON t.id = m.home_team_id
  WHERE m.in_progress = 0
  GROUP BY t.id
`;

const awayTeamStandingsQuery = `
  SELECT t.team_name AS name,
      SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 3
             WHEN m.home_team_goals = m.away_team_goals THEN 1
             ELSE 0 END) AS totalPoints,
      COUNT(m.id) AS totalGames,
      SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
      SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
      SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
      SUM(m.away_team_goals) AS goalsFavor,
      SUM(m.home_team_goals) AS goalsOwn
  FROM teams AS t
  INNER JOIN matches AS m
  ON t.id = m.away_team_id
  WHERE m.in_progress = 0
  GROUP BY t.id
 `;

export default class LeaderboardModel implements ILeaderboardModel {
  private homeTeamStandingsQuery = homeTeamStandingsQuery;
  private awayTeamStandingsQuery = awayTeamStandingsQuery;

  public async findAllHomeTeamStanding(): Promise<ILeaderboard[]> {
    const dbData: ILeaderboard[] = await db.query(this.homeTeamStandingsQuery, {
      type: QueryTypes.SELECT,
    });

    LeaderboardModel.getFormattedLeaderboard(dbData);
    LeaderboardModel.getSortedLeaderboard(dbData);

    return dbData;
  }

  public async findAllAwayTeamStanding(): Promise<ILeaderboard[]> {
    const dbData: ILeaderboard[] = await db.query(this.awayTeamStandingsQuery, {
      type: QueryTypes.SELECT,
    });

    LeaderboardModel.getFormattedLeaderboard(dbData);
    LeaderboardModel.getSortedLeaderboard(dbData);

    return dbData;
  }

  private static getFormattedLeaderboard = (leaderboardFromDb: ILeaderboard[]) =>
    leaderboardFromDb.forEach((e) => {
      e.totalPoints = Number(e.totalPoints);
      e.totalVictories = Number(e.totalVictories);
      e.totalDraws = Number(e.totalDraws);
      e.totalLosses = Number(e.totalLosses);
      e.goalsFavor = Number(e.goalsFavor);
      e.goalsOwn = Number(e.goalsOwn);
      e.goalsBalance = e.goalsFavor - e.goalsOwn;
      e.efficiency = +((e.totalPoints / (e.totalGames * 3)) * 100).toFixed(2);
    });

  private static getSortedLeaderboard = (leaderboard: ILeaderboard[]) =>
    leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
}
