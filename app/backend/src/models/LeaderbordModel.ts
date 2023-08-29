import { QueryTypes } from 'sequelize';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import db from '../database/models';

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
  ORDER BY totalPoints DESC, goalsFavor DESC;
`;

export default class ILeaderboardModel {
  private homeTeamStandingsQuery = homeTeamStandingsQuery;

  public async findAllHomeTeamStanding(): Promise<ILeaderboard[]> {
    const dbData: ILeaderboard[] = await db.query(this.homeTeamStandingsQuery, {
      type: QueryTypes.SELECT,
    });
    return dbData;
  }
}
