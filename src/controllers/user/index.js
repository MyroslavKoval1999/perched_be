const userService = require('../../services/user');

module.exports = {
  getUser: require("./getUser"),

  async joinToEvent(req, res, next) {
    try {
      const user = req.user;
      const { eventId } = req.body;
  
      await userService.joinToEvent(user, eventId);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
};
