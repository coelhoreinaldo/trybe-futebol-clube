import { QueryTypes } from 'sequelize';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import db from '../database/models';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { awayTeamStandingsQuery, homeTeamStandingsQuery } from '../utils/MySQLQueries';

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

  public async findAllTeamStanding(): Promise<ILeaderboard[]> {
    const homeTeams = await this.findAllHomeTeamStanding();
    const awayTeams = await this.findAllAwayTeamStanding();

    homeTeams.sort((a, b) => a.name.localeCompare(b.name));
    awayTeams.sort((a, b) => a.name.localeCompare(b.name));

    homeTeams.forEach((e, index) => {
      e.totalGames += awayTeams[index].totalGames;
      e.totalPoints += awayTeams[index].totalPoints;
      e.totalVictories += awayTeams[index].totalVictories;
      e.totalDraws += awayTeams[index].totalDraws;
      e.totalLosses += awayTeams[index].totalLosses;
      e.goalsFavor += awayTeams[index].goalsFavor;
      e.goalsOwn += awayTeams[index].goalsOwn;
      e.goalsBalance = e.goalsFavor - e.goalsOwn;
      e.efficiency = +((e.totalPoints / (e.totalGames * 3)) * 100).toFixed(2);
    });

    return LeaderboardModel.getSortedLeaderboard(homeTeams);
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
