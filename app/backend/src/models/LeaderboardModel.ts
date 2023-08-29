import { QueryTypes } from 'sequelize';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import db from '../database/models';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { awayTeamStandingsQuery, homeTeamStandingsQuery } from '../utils/MySQLQueries';

export default class LeaderboardModel implements ILeaderboardModel {
  private homeTeamStandingsQuery = homeTeamStandingsQuery;
  private awayTeamStandingsQuery = awayTeamStandingsQuery;

  public async findAllHomeTeamsStandings(): Promise<ILeaderboard[]> {
    const dbData: ILeaderboard[] = await db.query(this.homeTeamStandingsQuery, {
      type: QueryTypes.SELECT,
    });

    LeaderboardModel.getFormattedLeaderboard(dbData);
    LeaderboardModel.getSortedLeaderboard(dbData);

    return dbData;
  }

  public async findAllAwayTeamsStandings(): Promise<ILeaderboard[]> {
    const dbData: ILeaderboard[] = await db.query(this.awayTeamStandingsQuery, {
      type: QueryTypes.SELECT,
    });

    LeaderboardModel.getFormattedLeaderboard(dbData);
    LeaderboardModel.getSortedLeaderboard(dbData);

    return dbData;
  }

  public async findAllTeamsStandings(): Promise<ILeaderboard[]> {
    const homeTeams = await this.findAllHomeTeamsStandings();
    const awayTeams = await this.findAllAwayTeamsStandings();

    const newStandings = LeaderboardModel.compareTeamsStandings(homeTeams, awayTeams);

    return LeaderboardModel.getSortedLeaderboard(newStandings);
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

  private static compareTeamsStandings = (
    leaderboardHome: ILeaderboard[],
    leaderboardAway: ILeaderboard[],
  ) => {
    leaderboardHome.sort((a, b) => a.name.localeCompare(b.name));
    leaderboardAway.sort((a, b) => a.name.localeCompare(b.name));

    leaderboardHome.forEach((e, index) => {
      e.totalGames += leaderboardAway[index].totalGames;
      e.totalPoints += leaderboardAway[index].totalPoints;
      e.totalVictories += leaderboardAway[index].totalVictories;
      e.totalDraws += leaderboardAway[index].totalDraws;
      e.totalLosses += leaderboardAway[index].totalLosses;
      e.goalsFavor += leaderboardAway[index].goalsFavor;
      e.goalsOwn += leaderboardAway[index].goalsOwn;
      e.goalsBalance = e.goalsFavor - e.goalsOwn;
      e.efficiency = +((e.totalPoints / (e.totalGames * 3)) * 100).toFixed(2);
    });

    return leaderboardHome;
  };
}
