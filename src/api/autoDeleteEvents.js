const cron = require('../tools/cron/index');
const { EventModel } = require('../models');


async function deleteEvents() {
    const nextDay = new Date(new Date());
    nextDay.setDate(nextDay.getDate() - 2);

    await EventModel.deleteMany({ date: { $lte: nextDay }});
    return;
}

module.exports = () => cron.cronJob('01 00 * * *', deleteEvents);