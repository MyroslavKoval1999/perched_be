const { ApiError } = require("../errors");

module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    next(
      ApiError.BadRequest("Incorrect Data", {
        [error.path.split(".").pop()]: error.errors[0],
      })
    );
  }
};
