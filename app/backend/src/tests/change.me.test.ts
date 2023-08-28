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
