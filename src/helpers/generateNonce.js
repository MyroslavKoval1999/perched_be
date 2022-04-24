const crypto = require("crypto");

module.exports = () => crypto.randomBytes(30).toString("hex");
