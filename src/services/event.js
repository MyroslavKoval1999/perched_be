const { EventModel } = require("../models");
const ApiError = require('../errors/ApiError');

module.exports = {
  async create(title, date, description, tickets_amount, img) {
    const candidate = await EventModel.findOne({ title });
    if (candidate) throw ApiError.BadRequest('Event with this title already exists.');

    await EventModel.create({ title, date, description, tickets_amount, img });
    return;
  },

  async getMany() {
    const events = await EventModel.find().select('title date img guests tickets_amount').sort({ createdAt: -1 }).lean();
    events.forEach((el, i) => el.guests = el.guests.length);
    return events;
  },

  async getOne(userId, eventId) {
    const event =  await EventModel.findById(eventId).select('-__v').lean();
    if (!event) throw ApiError.notFound('Event not found');

    event.guests.forEach((element, index) => event.guests[index] = element.toString());
    const presence = event.guests.includes(userId.toString())

    event.guests = event.guests.length;
    return { event, presence };
  }
}
