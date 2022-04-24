const { OK } = require("../../constants/statusCode");
const { tokenService } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await tokenService.deleteToken(refreshToken);

    res
      .status(OK)
      .clearCookie("refreshToken")
      .json({ status: OK, message: "Successfully!" });
  } catch (error) {
    next(error);
  }
};
