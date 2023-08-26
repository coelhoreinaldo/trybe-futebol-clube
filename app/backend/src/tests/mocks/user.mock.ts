const email = 'admin@admin.com';

const validAdminUserBody = {
  email,
  password: 'secret_admin',
};

const foundAdminUserInDatabase = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email,
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const invalidEmailLogin = {
  email: '@exemplo.com',
  password: '1234354'
}

const invalidPasswordLogin = {
  email,
  password: '1234'
}
export default {
  email, validAdminUserBody, foundAdminUserInDatabase, invalidEmailLogin, invalidPasswordLogin
}