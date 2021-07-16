/**
 ** path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

// create new users
router.post('/new', createUser);

// login
router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
    ],
    login
);

// renew token
router.get('/renew', renewToken);

module.exports = router;
