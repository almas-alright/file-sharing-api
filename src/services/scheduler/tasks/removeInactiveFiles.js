'use strict';
/**
 * this function will be called from internal job
 */
const fileModule = require('../../../models/files');
exports.deleteInactiveFiles = () => {
    console.debug(`Deleting inactive file by schedular at ${new Date()}`);
    return fileModule.deleteInactiveFiles();
};
