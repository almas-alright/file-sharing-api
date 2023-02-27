'use strict';
const randomstring = require('randomstring');
const { APP_CONSTANTS } = require('../../constants/app');
class KeyGenerator {
    /**
     * generate a random string of given length
     * @param {number} length
     * @returns {string}
     */
    #generateKey(length) {
        return randomstring.generate({
            length: length
        });
    }

    /**
     * return generated keys
     * @returns {object}
     */
    getKeyPair() {
        const privateKey = this.#generateKey(APP_CONSTANTS.KEY_LENGTHS.PRIVATE_KEY);
        const publicKey = this.#generateKey(APP_CONSTANTS.KEY_LENGTHS.PUBLIC_KEY);

        return { privateKey, publicKey };
    }
}

const keyGenerator = new KeyGenerator();

module.exports = keyGenerator;
