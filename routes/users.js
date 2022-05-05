const usersRoutes = require('express').Router();
const {
  getUserInfo,
  updUserInfo,
} = require('../controllers/users');
const validations = require('../middlewares/validations');

usersRoutes.get('/me', getUserInfo);
usersRoutes.patch('/me', validations.updateProf, updUserInfo);

module.exports = usersRoutes;
