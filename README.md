# Node file share

## Setup Steps

-   Install 
    ```
    npm install
    ```
-   Generate config file for initial configuration
    ```
    npm run config
    ```
-   Set .env variables
    ```
    PORT=<WHICH_PORT_WANT_TO_START_SERVER>
    FOLDER=<WHICH_FOLDER_DO_YOU_WANT_TO_SAVE_YOUR_UPLOADED_FILE> // note: this folder will be created automatically in your project root directory
    PROVIDER=local // or GCP, currently only support local
    ```
-   Run Application

    ```
    npm start
    ```

-   Test Application

    ```
    npm test
    ```
