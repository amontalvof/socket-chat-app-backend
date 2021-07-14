const colors = require('colors/safe');
const mongoose = require('mongoose');

const dbConnection = async (params) => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(colors.cyan('DB Online!'));
    } catch (error) {
        console.log(colors.brightMagenta(error));
        throw new Error('Database error - check logs');
    }
};

module.exports = { dbConnection };
