import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import sequelize from '../database/models';
import leaderboardMock from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;


describe('the /leaderboard endpoint', () => {
  describe('on /home', () => {
    it('should return all teams', async function () {
     sinon.stub(sequelize, 'query').resolves(leaderboardMock.leaderboardHomeTeamsFromDb as any);

      const { status, body } = await chai.request(app).get('/leaderboard/home');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(leaderboardMock.leaderboardHomeTeamsFromDb);
    });
  })
  afterEach(sinon.restore);
});
