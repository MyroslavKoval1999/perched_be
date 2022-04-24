const { UserModel } = require("../models");

module.exports = {
  updateUser: async (id, body) => {
    return await UserModel.findByIdAndUpdate(id, body, { new: true });
  },
  findUser: async (params) => {
    return await UserModel.findOne(params);
  },
  createUser: async (id, body) => {
    return await UserModel.findOneAndUpdate({ id }, body, {
      upsert: true,
      new: true,
    });
  },
};
