const { CronJob } = require('cron');


module.exports = {
    cronJob (time, func) {
        new CronJob(time, func, null, true);
    }
}