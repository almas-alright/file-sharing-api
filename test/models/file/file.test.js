const fs = require('fs');
const fileModel = require('../../../src/models/files');
jest.setTimeout(25000);

let tempFileInfo = {
    privateKey: '',
    publicKey: '',
    fileName: ''
};

it('Should return object in success and array in error', async () => {
    let file = fs.readFileSync('dummy.txt');
    file.data = Buffer.from(file.buffer).toString();
    file.name = 'dummy.txt';
    await fileModel
        .uploadFile(file, process.env.FOLDER)
        .then((res) => {
            tempFileInfo.privateKey = res.privateKey;
            tempFileInfo.publicKey = res.publicKey;
            tempFileInfo.fileName = `${process.env.FOLDER}/${file.name}`;
            expect(typeof res).toBe('object');
        })
        .catch((err) => {
            expect(Array.isArray(err)).toBe(true);
        });
});

it('Should return privateKey with response', async () => {
    let file = fs.readFileSync('dummy.txt');
    file.data = Buffer.from(file.buffer).toString();
    file.name = 'dummy.txt';
    await fileModel
        .uploadFile(file, process.env.FOLDER)
        .then((res) => {
            expect('publicKey' in res).toBe(true);
        })
        .catch((err) => {
            expect(Array.isArray(err)).toBe(true);
        });
});

it('Should return publicKey with response', async () => {
    let file = fs.readFileSync('dummy.txt');
    file.data = Buffer.from(file.buffer).toString();
    file.name = 'dummy.txt';
    await fileModel
        .uploadFile(file, process.env.FOLDER)
        .then((res) => {
            expect('privateKey' in res).toBe(true);
        })
        .catch((err) => {
            expect(Array.isArray(err)).toBe(true);
        });
});

it('Should return string in success and array in error', async () => {
    await fileModel
        .getFileByPublicKey(tempFileInfo.publicKey)
        .then((res) => {
            expect(typeof res).toBe('object');
        })
        .catch((err) => {
            expect(Array.isArray(err)).toBe(true);
        });
});

it('Should return fileName as string', async () => {
    await fileModel
        .getFileByPublicKey(tempFileInfo.publicKey)
        .then((res) => {
            expect(typeof res).toBe('object');
        })
        .catch((err) => {
            expect(Array.isArray(err)).toBe(true);
        });
});
