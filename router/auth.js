const { Router } = require('express');

const router = Router();

// create new users
router.post('/new', (req, res) => {
    res.json({
        ok: true,
        msg: 'register',
    });
});

// login
router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'login',
    });
});

// renew token
router.get('/renew', (req, res) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
});

module.exports = router;
