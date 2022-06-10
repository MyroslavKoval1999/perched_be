const { UserModel, EventModel } = require("../models");
const ApiError = require('../errors/ApiError');

module.exports = {
  updateUser: async (id, body) => {
    return await UserModel.findByIdAndUpdate(id, body, { new: true });
  },
  findUser: async (params) => {
    return await UserModel.findOne(params);
  },
  createUser: async (id, body) => {
    return await UserModel.findOneAndUpdate({ id }, body, {
      upsert: true,
      new: true,
    });
  },

  async joinToEvent(user, eventId) {
    const event = await EventModel.findById(eventId);
    if (event.tickets_amount <= 0) {
      throw ApiError.BadRequest('There are no more seats at the event.');
    }
    if (event.guests.includes(user._id)) {
      throw ApiError.BadRequest('You already registered at the event.');
    }

    event.guests.push(user._id);
    event.tickets_amount = event.tickets_amount - 1;
    await event.save();

    return;
  },
};
