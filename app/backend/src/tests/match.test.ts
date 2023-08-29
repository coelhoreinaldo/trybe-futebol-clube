import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';

import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import matchMock from './mocks/match.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('the /matches endpoint', () => {
  describe('by get method', () => {
    it('should return status 200 and all matches', async function () {
      sinon.stub(SequelizeMatch, 'findAll').resolves(matchMock.matches as any);

      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchMock.matches);
    });

    it('should return status 200 and only matches in progress', async function () {
      sinon
        .stub(SequelizeMatch, 'findAll')
        .resolves(matchMock.matchesInProgress as any);

      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchMock.matchesInProgress);
    });

    it('should return status 200 and only finished matches', async function () {
      sinon
        .stub(SequelizeMatch, 'findAll')
        .resolves(matchMock.finishedMatches as any);

      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=false');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchMock.finishedMatches);
    });
  });
  describe('by patch method', () => {
    it('should return status 200 and finish a match', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon
        .stub(SequelizeMatch, 'findByPk')
        .resolves(matchMock.matchesInProgress[0] as any);
      sinon.stub(SequelizeMatch, 'update').resolves();

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'validToken');

      expect(status).to.equal(200);
      expect(body).to.have.key('message');
      expect(body.message).to.equal('Finished');
    });

    it('should return status 401 if the match is already finished', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon
        .stub(SequelizeMatch, 'findByPk')
        .resolves(matchMock.finishedMatches[0] as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'validToken');

      expect(status).to.equal(400);
      expect(body).to.have.key('message');
      expect(body.message).to.equal('Match already finished');
    });

    it('should return status 404 if the match is not found', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'validToken');

      expect(status).to.equal(404);
      expect(body).to.have.key('message');
      expect(body.message).to.equal('Match not found');
    });

    it('should return status 200 and update a match', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon.stub(SequelizeMatch, 'update').resolves();
      sinon
        .stub(SequelizeMatch, 'findByPk')
        .onFirstCall()
        .resolves(matchMock.matchesInProgress[0] as any)
        .onSecondCall()
        .resolves(matchMock.updatedMatch as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send(matchMock.updateMatchValidBody)
        .set('authorization', 'validToken');

      expect(body).to.deep.equal(matchMock.updatedMatch);
      expect(status).to.equal(200);
    });

    it('should return status 404 if the match is not found', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send(matchMock.updateMatchValidBody)
        .set('authorization', 'validToken');

      expect(status).to.equal(404);
      expect(body).to.have.key('message');
      expect(body.message).to.equal('Match not found');
    });

    it('should return status 400 if the match is already finished', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon
        .stub(SequelizeMatch, 'findByPk')
        .resolves(matchMock.finishedMatches[0] as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send(matchMock.updateMatchValidBody)
        .set('authorization', 'validToken');

      expect(status).to.equal(400);
      expect(body).to.have.key('message');
      expect(body.message).to.equal('Match already finished');
    });
  });
  describe('by post method', () => {
    it.skip('should return status 201 and create a match', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon
        .stub(SequelizeMatch, 'create')
        .resolves(matchMock.createdMatch as any);
      sinon
        .stub(SequelizeTeam, 'findByPk')
        .onFirstCall()
        .resolves(matchMock.foundTeam1 as any)
        .onSecondCall()
        .resolves(matchMock.foundTeam2 as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(matchMock.createMatchBody)
        .set('authorization', 'validToken');

        expect(body).to.deep.equal(matchMock.createdMatch);
      expect(status).to.equal(201);
    });
    it('should return status 422 if the teams are the same', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(matchMock.createMatchWithTheSameTeams)
        .set('authorization', 'validToken');

      expect(status).to.equal(422);
      expect(body).to.have.key('message');
      expect(body.message).to.equal(
        'It is not possible to create a match with two equal teams'
      );
    });
    it('should return status 404 if a team is not found', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns();
      sinon
        .stub(SequelizeTeam, 'findByPk')
        .onFirstCall()
        .resolves(matchMock.foundTeam1 as any)
        .onSecondCall()
        .resolves(null);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(matchMock.createMatchWithInexistentTeam)
        .set('authorization', 'validToken');

      expect(status).to.equal(404);
      expect(body).to.have.key('message');
      expect(body.message).to.equal('There is no team with such id!');
    });
  });

  afterEach(sinon.restore);
});
