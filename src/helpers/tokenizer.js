const jwt = require("jsonwebtoken");

module.exports = async (data, privateKey, expiresIn) => {
  return await jwt.sign(data, privateKey, { expiresIn });
};
