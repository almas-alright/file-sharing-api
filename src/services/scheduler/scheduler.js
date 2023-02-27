/**
 * this is internal scheduler
 * it is using cronjob service
 * it will schedule tasks those will be run by internal job
 */
const { APP_CONSTANTS } = require('../../constants/app');
const CronJob = require('../../services/cronjob/cronjob');
const { deleteInactiveFiles } = require('./tasks/removeInactiveFiles');

class Scheduler {
    // initiate schedular
    initiate = () => {
        try {
            // Start jobs here
            this.#startEveryNightTwelveAmJob();
        } catch (error) {
            console.debug(error);
        }
    };
    // start a job that will run at 12 AM every night
    #startEveryNightTwelveAmJob() {
        const todayJob = new CronJob();
        // set task function
        todayJob.addTask(APP_CONSTANTS.TASKS.REMOVE_INACTIVE_FILES.NAME, deleteInactiveFiles);
        // schedule task
        todayJob.schedule(APP_CONSTANTS.TASKS.REMOVE_INACTIVE_FILES.EXPRESSION);
    }
}

exports.scheduler = new Scheduler();
