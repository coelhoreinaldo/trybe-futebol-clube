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
   ORDER BY goalsFavor DESC;
`;

export default class ILeaderboardModel {
  private homeTeamStandingsQuery = homeTeamStandingsQuery;

  public async findAllHomeTeamStanding(): Promise<ILeaderboard[]> {
    const dbData: ILeaderboard[] = await db.query(this.homeTeamStandingsQuery, {
      type: QueryTypes.SELECT,
    });

    dbData.forEach((e) => {
      e.totalPoints = Number(e.totalPoints);
      e.totalVictories = Number(e.totalVictories);
      e.totalDraws = Number(e.totalDraws);
      e.totalLosses = Number(e.totalLosses);
      e.goalsFavor = Number(e.goalsFavor);
      e.goalsOwn = Number(e.goalsOwn);
    });

    return dbData as unknown as ILeaderboard[];
  }
}
