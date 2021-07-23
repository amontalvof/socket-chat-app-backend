const { response } = require('express');
const bcrypt = require('bcryptjs');
const colors = require('colors/safe');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jsonWebToken');

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

        const user = new User(req.body);
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        // save user in database
        await user.save();
        // generate JWT
        const token = await generateJWT(user.id);
        res.json({ user, token });
    } catch (error) {
        console.log(colors.brightMagenta(error));
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator',
        });
    }
};
const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        // Check if the mail exists
        const userDB = await User.findOne({ email})
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found in the database',
            });
        }
        // Validate the password
        const validPassword = bcrypt.compareSync(password, userDB.password)
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'The password is wrong',
            });
        }
        // Generate Json Web Token
        const token = await generateJWT(userDB.id)
        return res.json({
            ok: true,
            user: userDB,
            token,
        });
    } catch (error) {
        console.log(colors.brightMagenta(error));
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator',
        });
    }
};
const renewToken = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
};

module.exports = { createUser, login, renewToken };
