export const homeTeamStandingsQuery = `
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

export const awayTeamStandingsQuery = `
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
