const { SIGN_MESSAGE, COOKIE_DAYS } = require("../../config");
const { OK } = require("../../constants/statusCode");
const { ApiError } = require("../../errors");
const { authService, tokenService, userService } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const { publicAddress, nonce, _id } = req.user;
    const { signature } = req.body;

    const validSignature = authService.verifySignature(
      `${SIGN_MESSAGE} ${nonce}`,
      publicAddress,
      signature
    );
    if (!validSignature)
      return next(ApiError.BadRequest("Incorrect signature, try again!"));

    await userService.updateUser(_id, { nonce: null, activeUser: true });

    const { accessToken, refreshToken } = await tokenService.generateTokens(
      _id
    );
    await tokenService.createToken(_id, refreshToken);

    res
      .status(OK)
      .cookie("refreshToken", refreshToken, {
        maxAge: COOKIE_DAYS * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        status: OK,
        message: "Successfully!",
        data: {
          accessToken,
        },
      });
  } catch (error) {
    next(error);
  }
};
