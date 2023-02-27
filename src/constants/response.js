exports.RESPONSE_CONSTANTS = Object.freeze({
    TOO_MANY_REQUESTS: {
        MESSAGE: 'Too many request please try again later',
            CODE: '0006'
    },
    FILE: {
        UPLOAD_FILE: {
            SUCCESS: {
                MESSAGE: 'File successfully uploaded',
                    CODE: '1000'
            },
            ERROR: {
                MESSAGE: 'File uploading failed',
                    CODE: '0001',
                    MIDDLEWARE: {
                    FILE_REQUIRED: {
                        MESSAGE: 'File is required with request body',
                            CODE: '0002'
                    },
                    MAX_UPLOAD_LIMIT_EXCEEDED: {
                        MESSAGE: `Could not upload file more than ${100 * 1024 * 1024} Byte`, // TODO: take value dynamically
                            CODE: '0003'
                    },
                    INVALID_FILE_FORMAT: {
                        MESSAGE: `Invalid file format`,
                            CODE: '0004'
                    }
                }
            }
        },
        GET_FILE: {
            ERROR: {
                MESSAGE: 'Could not download file',
                    CODE: '0005'
            }
        },
        DELETE_FILE: {
            ERROR: {
                MESSAGE: 'Could not delete file',
                    CODE: '0007'
            },
            SUCCESS: {
                MESSAGE: 'File successfully deleted',
                    CODE: '1006'
            }
        }
    }
});