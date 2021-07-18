const { response } = require('express');
const colors = require('colors/safe');
const User = require('../models/user');

const createUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        // verify that the email does not exist
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is already registered in the database',
            });
        }
        // TODO: Encriptar contrasena

        // save user in database
        const user = new User(req.body);
        await user.save();
        res.json({ user });
    } catch (error) {
        console.log(colors.brightMagenta(error));
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator',
        });
    }
};
const login = async (req, res = response) => {
    const { email, password } = req.body;
    res.json({
        ok: true,
        msg: 'login',
        email,
        password,
    });
};
const renewToken = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
};

module.exports = { createUser, login, renewToken };
