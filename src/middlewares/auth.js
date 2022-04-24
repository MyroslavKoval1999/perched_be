const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../config");
const { ApiError } = require("../errors");
const { getToken } = require("../helpers");
const { userService } = require("../services");

module.exports = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    const userId = await jwt.verify(token, JWT_ACCESS_SECRET, (error, data) => {
      if (error) {
        return next(ApiError.UnauthorizedError());
      }
      return data.userId;
    });

    const user = await userService.findUser({ _id: userId });
    if (!user) return next(ApiError.UnauthorizedError());

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
