'use strict';
/**
 * manage storage strategies
 * set storage strategy by provider
 */
class StorageStrategyManager {
    constructor() {
        this._strategy = null;
    }
    async uploadFile(file, uploadDir) {
        return this._strategy.uploadFile(file, uploadDir);
    }

    async downloadFile(fileNameWithExtension) {
        return this._strategy.downloadFile(fileNameWithExtension);
    }

    async deleteFile(fileNameWitExtension) {
        return this._strategy.deleteFile(fileNameWitExtension);
    }

    setStrategy(strategy) {
        this._strategy = strategy;
    }
}

const storageStrategyManager = new StorageStrategyManager();

module.exports = storageStrategyManager;
