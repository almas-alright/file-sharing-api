const limit = require('express-rate-limit');
const { APP_CONSTANTS } = require('../constants/app');
const { RESPONSE_CONSTANTS } = require('../constants/response');
/**
 * this middleware will check client requests before process by api limit config, throw error if he/she exceed limt
 */
module.exports = limit({
    windowMs: APP_CONSTANTS.API_CALL_WINDOW_IN_MILLISECONDS,
    max: APP_CONSTANTS.MAX_API_CALL_IN_WINDOW,
    handler: function (req, res) {
        res.status(429).send({
            success: false,
            message: RESPONSE_CONSTANTS.TOO_MANY_REQUESTS.MESSAGE,
            code: RESPONSE_CONSTANTS.TOO_MANY_REQUESTS.CODE,
            errors: [{ msg: RESPONSE_CONSTANTS.TOO_MANY_REQUESTS.MESSAGE }]
        });
    }
});
