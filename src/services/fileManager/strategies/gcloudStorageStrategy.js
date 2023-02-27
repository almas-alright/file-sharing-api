const { Storage, Bucket } = require('@google-cloud/storage');
const { APP_CONSTANTS } = require('../../../constants/app');

// require('dotenv-flow').config({ silent: true });

class CloudStorageStrategy {
    #storage;
    #bucket;
    bucketName;

    constructor() {
        if (
            !process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID ||
            !process.env.GOOGLE_CLOUD_STORAGE_KEY_FILE_NAME ||
            !process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME
        ) {
            console.log('Gcp initialization failed, please provide gcp configs');
        } else {
            this.#storage = new Storage({
                projectId: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
                keyFilename: process.env.GOOGLE_CLOUD_STORAGE_KEY_FILE_NAME
            });

            // Create bucket
            this.bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME;
            this.#bucket = this.#storage.bucket(this.bucketName);

            this.#setCorsConfig();
        }
    }

    async #setCorsConfig() {
        try {
            await this.#bucket.setCorsConfiguration([
                {
                    method: ['GET'],
                    origin: ['*']
                }
            ]);
        } catch (error) {
            throw new Error('GCP initialization failed!!!');
        }
    }

    #getPublicUrl(bucketName, fileName) {
        const url = `${APP_CONSTANTS.CLOUD_STORAGE_URL}/${bucketName}/${fileName}`;
        return url;
    }

    #listenForEvent(stream, file, gcsFileName, linkFile) {
        return new Promise((resolve, reject) => {
            // On error
            stream.on('error', (err) => {
                return reject(err);
            });

            // On success
            stream.on('finish', () => {
                file.cloudStorageObject = gcsFileName;
                linkFile.makePublic().then(() => {
                    file.gcsUrl = this.#getPublicUrl(this.bucketName, gcsFileName);
                    resolve(file.gcsUrl);
                });
            });

            stream.end(file.data); // End the stream
        });
    }

    async uploadFile(file) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            const gcpFilePath = `${process.env.FOLDER}/${file.name}`;

            const linkFile = this.#bucket.file(gcpFilePath);
            const stream = await linkFile.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                },
                resumable: false
            });

            // Listen for file upload's event
            try {
                const response = await this.#listenForEvent(stream, file, gcpFilePath, linkFile);
                resolve([response]);
            } catch (error) {
                throw new Error(error);
            }
        });
    }

    async deleteFile(fileName) {
        console.log('wnat to delete', fileName);
        return await this.#bucket.file(fileName).delete();
    }

    async downloadFile(fileName) {
        const linkFile = await this.#bucket.file(fileName);
        return linkFile.createReadStream();
    }
}

const gCloudStorageStrategy = new CloudStorageStrategy();

module.exports = gCloudStorageStrategy;
