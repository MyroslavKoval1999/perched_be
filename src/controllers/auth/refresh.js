const { COOKIE_DAYS } = require("../../config");
const { OK } = require("../../constants/statusCode");
const { tokenService } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const tokenData = req.tokenData;

    const { accessToken, refreshToken } = await tokenService.generateTokens(
      tokenData.userId
    );
    await tokenService.updateToken(tokenData._id, { refreshToken });

    res
      .status(OK)
      .cookie("refreshToken", refreshToken, {
        maxAge: COOKIE_DAYS * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        status: OK,
        message: "Successfully!",
        data: { accessToken },
      });
  } catch (error) {
    next(error);
  }
};
