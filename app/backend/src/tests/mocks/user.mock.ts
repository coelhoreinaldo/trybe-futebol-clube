const validAdminUserBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const foundAdminUserInDatabase = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export default {
  validAdminUserBody, foundAdminUserInDatabase,
}