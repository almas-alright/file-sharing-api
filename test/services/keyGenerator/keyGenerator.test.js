const { APP_CONSTANTS } = require('../../../src/constants/app');
const keyGenerator = require('../../../src/services/keyGenerator/keyGenerator');

it('Should return object', () => {
    expect(typeof keyGenerator.getKeyPair()).toBe('object');
});

it('Should return publicKey with response', () => {
    expect('publicKey' in keyGenerator.getKeyPair()).toBe(true);
});

it('Should return privateKey with response', () => {
    expect('privateKey' in keyGenerator.getKeyPair()).toBe(true);
});

it(`Length of publicKey should ${APP_CONSTANTS.KEY_LENGTHS.PUBLIC_KEY}`, () => {
    expect(keyGenerator.getKeyPair().publicKey.length).toBe(APP_CONSTANTS.KEY_LENGTHS.PUBLIC_KEY);
});

it(`Length of privateKey should ${APP_CONSTANTS.KEY_LENGTHS.PRIVATE_KEY}`, () => {
    expect(keyGenerator.getKeyPair().privateKey.length).toBe(APP_CONSTANTS.KEY_LENGTHS.PRIVATE_KEY);
});
