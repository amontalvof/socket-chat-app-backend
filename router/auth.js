/**
 ** path: api/login
 */

const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

// create new users
router.post('/new', createUser);

// login
router.post('/', login);

// renew token
router.get('/renew', renewToken);

module.exports = router;
