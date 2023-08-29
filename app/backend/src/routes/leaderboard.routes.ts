import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req:Request, res:Response) => leaderboardController.getHomeTeamsStandings(req, res),
);

router.get(
  '/away',
  (req:Request, res:Response) => leaderboardController.getAwayTeamsStandings(req, res),
);

export default router;
