'use strict';
/**
 * this middleware will validate client requests
 * ! currently only upload file api validating
 * will throw error to client directly, if could not validating client requests
 * process next function if successfully validate requests
 */

const { APP_CONSTANTS } = require('../constants/app');
const { RESPONSE_CONSTANTS } = require('../constants/response');
const { FILES } = require('../routes/urls');

module.exports = (req, res, next) => {
    const validateUploadFileApi = () => {
        // checking file is attached with api request or not
        if (!req?.files?.file) {
            res.status(400).send({
                success: false,
                message: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.MESSAGE,
                code: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.CODE,
                errors: [{ msg: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.MIDDLEWARE.FILE_REQUIRED.MESSAGE }]
            });
        } else {
            // checking max upload file size
            if (req?.files?.file?.size > APP_CONSTANTS.MAX_UPLOAD_SIZE) {
                res.status(400).send({
                    success: false,
                    message: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.MESSAGE,
                    code: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.CODE,
                    errors: [
                        {
                            msg: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.MIDDLEWARE.MAX_UPLOAD_LIMIT_EXCEEDED
                                .MESSAGE
                        }
                    ]
                });
                // checking file format
            } else if (APP_CONSTANTS.ALLOWED_FILE_FORMATS.length > 0) {
                if (!APP_CONSTANTS.ALLOWED_FILE_FORMATS.includes(req?.files?.file?.mimetype)) {
                    res.status(400).send({
                        success: false,
                        message: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.MESSAGE,
                        code: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.CODE,
                        errors: [
                            {
                                msg: RESPONSE_CONSTANTS.FILE.UPLOAD_FILE.ERROR.MIDDLEWARE.INVALID_FILE_FORMAT
                                    .MESSAGE
                            }
                        ]
                    });
                } else {
                    return next();
                }
            } else {
                return next();
            }
        }
    };

    // check upload api call, if yes validate that api request
    if (req.url === FILES.POST_FILE && req.method === 'POST') {
        return validateUploadFileApi();
    } else {
        return next();
    }
};
