import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/team.mock';

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
