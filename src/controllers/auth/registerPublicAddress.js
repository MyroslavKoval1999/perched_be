const { SIGN_MESSAGE } = require("../../config");
const { OK } = require("../../constants/statusCode");
const { authService } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const { publicAddress } = req.params;

    const user = await authService.createUser(publicAddress.toLowerCase());

    res.status(OK).json({
      status: OK,
      message: "Successfully!",
      data: { signMessage: `${SIGN_MESSAGE} ${user.nonce}` },
    });
  } catch (error) {
    next(error);
  }
};
