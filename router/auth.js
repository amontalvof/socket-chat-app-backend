/**
 ** path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// create new users
router.post(
    '/new',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('name', 'The name is required').not().isEmpty(),
        validateFields,
    ],
    createUser
);

// login
router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        validateFields,
    ],
    login
);

// renew token
router.get('/renew', validateJWT, renewToken);

module.exports = router;
