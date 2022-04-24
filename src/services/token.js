const {
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_TIME,
  JWT_ACCESS_SECRET,
  REFRESH_TOKEN_TIME,
} = require("../config");
const { tokenizer } = require("../helpers");
const { TokenModel } = require("../models");

module.exports = {
  generateTokens: async (userId) => {
    const accessToken = await tokenizer(
      { userId },
      JWT_ACCESS_SECRET,
      ACCESS_TOKEN_TIME
    );
    const refreshToken = await tokenizer(
      {},
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_TIME
    );
    return { accessToken, refreshToken };
  },
  createToken: async (userId, refreshToken) => {
    return await TokenModel.create({ userId, refreshToken });
  },
  deleteToken: async (refreshToken) => {
    await TokenModel.deleteOne({ refreshToken });
  },
  getToken: async (body) => {
    return await TokenModel.findOne(body);
  },
  updateToken: async (id, body) => {
    await TokenModel.findByIdAndUpdate(id, body);
  },
};
