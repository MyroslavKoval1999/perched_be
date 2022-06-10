const eventService = require('../../services/event');
const ApiError = require('../../errors/ApiError');


module.exports =  {
  async create(req, res, next) {
    try {
      const { title, date, description, tickets_amount, img } = req.body;
      if (new Date(date) < new Date()) {
        throw ApiError.BadRequest('You not allowed to set past date');
      }

      await eventService.create(title, date, description, tickets_amount, img);
      res.json({ status: true });
    } catch (err) {
      next(err);
    }
  },

  async getMany(req, res, next) {
    try {
      const events = await eventService.getMany();
      res.json({ status: true, events });
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const { event, presence } = await eventService.getOne(req.user._id, id);
      res.json({ success: true, event, presence });
    } catch (err) {
      next(err);
    }
  }
}