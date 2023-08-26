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

chai.use(chaiHttp);

const { expect } = chai;

describe('server', () => {
  it('should be ok', async function () {
    const { status } = await chai.request(app).get('/')

    expect(status).to.equal(200)
  });
})

describe('the teams endpoint', () => {
  it('should return all teams', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any)

    const { status, body } = await chai.request(app).get('/teams')

    expect(status).to.equal(200)
    expect(body).to.deep.equal(teams)
  });
  it('should return a team by id', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teams[0] as any)

    const { status, body } = await chai.request(app).get('/teams/1')

    expect(status).to.equal(200)
    expect(body).to.deep.equal(teams[0])
  });
  it('should return not found if the team doesn\'t exists', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null)

    const { status, body } = await chai.request(app).get('/teams/99')

    expect(status).to.equal(404)
    expect(body).to.have.key('message')
    expect(body.message).to.equal('Team 99 not found')
  });
  afterEach(sinon.restore)
});

describe('the login endpoint', () => {
  it('should return a token and status 200 if the login is successful', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock.foundAdminUserInDatabase as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();

    const { status, body } = await chai.request(app).post('/login').send(userMock.validAdminUserBody)

    expect(status).to.equal(200)
    expect(body).to.have.key('token');
  });
  it('should return status 400 if a email is not provided', async function() {
    const { status, body } = await chai.request(app).post('/login').send({ password: 'secret_admin'})

    expect(status).to.equal(400)
    expect(body).to.have.key('message');
    expect(body.message).to.equal('All fields must be filled');

  })
  it('should return status 400 if a password is not provided', async function() {
    const { status, body } = await chai.request(app).post('/login').send({ email: 'admin@admin.com'})

    expect(status).to.equal(400)
    expect(body).to.have.key('message');
    expect(body.message).to.equal('All fields must be filled');
  })
  it('should return 400 if fields is empty', async function() {
    const { status, body } = await chai.request(app).post('/login').send({})

    expect(status).to.equal(400)
    expect(body).to.have.key('message');
    expect(body.message).to.equal('All fields must be filled');
  });
})