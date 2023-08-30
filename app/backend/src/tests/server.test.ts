import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('server', () => {
  it('should be ok', async function () {
    const { status } = await chai.request(app).get('/');

    expect(status).to.equal(200);
  });
});
