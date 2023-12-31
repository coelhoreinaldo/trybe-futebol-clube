import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser';

import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import userMock from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

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
