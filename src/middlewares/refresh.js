const jwt = require("jsonwebtoken");
const { JWT_REFRESH_SECRET } = require("../config");
const { ApiError } = require("../errors");
const { tokenService } = require("../services");

module.exports = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.UnauthorizedError());
    }

    const token = await tokenService.getToken({ refreshToken });
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    await jwt.verify(token.refreshToken, JWT_REFRESH_SECRET, (error) => {
      if (error) {
        return next(ApiError.UnauthorizedError());
      }
    });

    req.tokenData = token;
    next();
  } catch (error) {
    next(error);
  }
};
