'use strict';
/**
 * do all file operation of local storage here
 *
 */
const { writeFileSync, existsSync, mkdirSync, readFileSync, unlinkSync, createReadStream } = require('fs');

class LocalStorageStrategy {
    // saving file in local storage
    /**
     *
     * @param {*} file
     * @param {*} fileToSave
     * @returns
     */
    async #saveFileToStorage(file, fileToSave) {
        // saving file to storage
        return writeFileSync(fileToSave, file.data);
    }

    /**
     *
     * @param {*} fileWithDir
     * @returns
     */
    async #getFileFromStorage(fileWithDir) {
        // retrieving  file from storage
        return readFileSync(fileWithDir);
    }

    async #getFileStream(fileDir) {
        return createReadStream(fileDir);
    }

    /**
     *
     * @param {*} fileName
     * @returns
     */
    async #removeFileFromStorage(fileName) {
        // deleting file from storage
        return unlinkSync(fileName);
    }
    /**
     *
     * @param {*} fileData
     * @param {*} fileName
     * @returns
     */
    async uploadFile(fileData, fileName) {
        // make directory if not exists
        existsSync(fileName) ? fileName : mkdirSync(fileName);

        const fileToSave = `${fileName}/${fileData.name}`;

        return this.#saveFileToStorage(fileData, fileToSave);
    }
    /**
     *
     * @param {*} fileName
     * @returns
     */
    async downloadFile(fileName) {
        return this.#getFileStream(fileName);
    }
    /**
     *
     * @param {*} fileName
     * @returns
     */
    async deleteFile(fileName) {
        return this.#removeFileFromStorage(fileName)
            .then(() => {})
            .catch((err) => {
                throw [{ msg: 'No such file found by this token' }];
            });
    }
}

const localStorageStrategy = new LocalStorageStrategy();
module.exports = localStorageStrategy;
