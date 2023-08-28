import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeUser from '../database/models/SequelizeUser';

import { teams } from './mocks/team.mock';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import userMock from './mocks/user.mock';
import matchMock from './mocks/match.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('server', () => {
  it('should be ok', async function () {
    const { status } = await chai.request(app).get('/');

    expect(status).to.equal(200);
  });
});

describe('the /teams endpoint', () => {
  it('should return all teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  it('should return a team by id', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teams[0] as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams[0]);
  });
  it("should return not found if the team doesn't exists", async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/99');

    expect(status).to.equal(404);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('Team 99 not found');
  });
  afterEach(sinon.restore);
});

describe('the /login endpoint', () => {
  it('should return a token and status 200 if the login is successful', async function () {
    sinon
      .stub(SequelizeUser, 'findOne')
      .resolves(userMock.foundAdminUserInDatabase as any);
    // sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(userMock.validAdminUserBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });
  it('should return status 400 if a email is not provided', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' });

    expect(status).to.equal(400);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('All fields must be filled');
  });
  it('should return status 400 if a password is not provided', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' });

    expect(status).to.equal(400);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('All fields must be filled');
  });

  it('should return 400 if fields is empty', async function () {
    const { status, body } = await chai.request(app).post('/login').send({});

    expect(status).to.equal(400);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('All fields must be filled');
  });

  it('should return 401 if email is invalid', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(userMock.invalidEmailLogin);

    expect(status).to.equal(401);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('Invalid email or password');
  });

  it('should return 401 if password is invalid', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(userMock.invalidPasswordLogin);

    expect(status).to.equal(401);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('Invalid email or password');
  });

  it('should return 401 if password or email is wrong', async function () {
    sinon
      .stub(SequelizeUser, 'findOne')
      .resolves(userMock.foundAdminUserInDatabase as any);
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email: userMock.email, password: 'wrong_password' });

    expect(status).to.equal(401);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('Invalid email or password');
  });
  afterEach(sinon.restore);
});

describe('the /login/role endpoint', () => {
  it('should return 401 if a token is not provided', async function () {
    const { status, body } = await chai.request(app).get('/login/role');

    expect(status).to.equal(401);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('Token not found');
  });

  it('should return 401 if a token is invalid', async function () {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', 'invalidToken');

    expect(status).to.equal(401);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('Token must be a valid token');
  });

  it("should return status 200 and a object with user's role if a token is valid", async function () {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon
      .stub(SequelizeUser, 'findOne')
      .resolves(userMock.foundAdminUserInDatabase as any);

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', 'validToken');

    expect(body).to.have.key('role');
    expect(status).to.equal(200);
    expect(body.role).to.equal('admin');
  });
});

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
    // it('should return status 201 and create a match', async function () {
    //   sinon.stub(JWT, 'verify').resolves();
    //   sinon.stub(Validations, 'validateToken').returns();
    //   sinon
    //     .stub(SequelizeMatch, 'create')
    //     .resolves(matchMock.createdMatch as any);
    //   sinon
    //     .stub(SequelizeTeam, 'findByPk')
    //     .onFirstCall()
    //     .resolves(matchMock.foundTeam1 as any)
    //     .onSecondCall()
    //     .resolves(matchMock.foundTeam2 as any);

    //   const { status, body } = await chai
    //     .request(app)
    //     .post('/matches')
    //     .send(matchMock.createMatchBody)
    //     .set('authorization', 'validToken');

    //   expect(body).to.deep.equal(matchMock.createdMatch);
    //   expect(status).to.equal(201);
    // });
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
