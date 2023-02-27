const cron = require('node-cron');
const { APP_CONSTANTS } = require('../../constants/app');

/**
 * internal tasks will be set here
 */
class CronJob {
    // initiate job and task
    job = null;
    task = {};

    // add task into task list by unique name
    addTask(name, task) {
        this.task[name] = task;
    }
    // remove task from task list, by name
    removeTask(name) {
        delete this.tasks[name];
    }

    // schedule a task with client given function and expression
    schedule(expression = '* * * * *') {
        this.job = cron.schedule(expression, this.task[APP_CONSTANTS.TASKS.REMOVE_INACTIVE_FILES.NAME]);
    }
    // un schedule existing job from queue
    unSchedule() {
        this.job.stop();
    }
}

module.exports = CronJob;
