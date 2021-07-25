/**
 ** path: api/messages
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getChat } = require('../controllers/messages');

const router = Router();

router.get(
    '/:from',
    [
        check('from', 'It is not a valid id').isMongoId(),
        validateFields,
        validateJWT,
    ],
    getChat
);

module.exports = router;
