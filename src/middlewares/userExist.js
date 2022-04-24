const { ApiError } = require("../errors");
const { userService } = require("../services");

module.exports = async (req, res, next) => {
  try {
    const { publicAddress } = req.params;

    const address = publicAddress.toLowerCase();

    const user = await userService.findUser({ publicAddress: address });
    if (!user)
      return next(ApiError.BadRequest("User with such address not exist!"));

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
