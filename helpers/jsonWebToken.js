const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.JWT_KEY,
            {
                expiresIn: '24h',
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Error generating the json web token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

const verifyJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
};

module.exports = { generateJWT, verifyJWT };
