const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    publicAddress: {
      type: String,
      required: true,
      unique: true,
    },
    nonce: {
      type: String,
      default: null,
    },
    activeUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", userSchema);
