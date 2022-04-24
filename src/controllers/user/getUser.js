const { OK } = require("../../constants/statusCode");

module.exports = async (req, res, next) => {
  try {
    const data = req.user;

    res.status(OK).json({
      status: OK,
      message: "Successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
