const Web3 = require("web3");
const { WEB3_HTTP } = require("../config");
const { generateNonce } = require("../helpers");
const { UserModel } = require("../models");
const { ApiError } = require("../errors");

const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_HTTP));

module.exports = {
  createUser: async (publicAddress) => {
    const nonce = generateNonce();

    return await UserModel.findOneAndUpdate(
      { publicAddress },
      { publicAddress, nonce },
      { upsert: true, new: true }
    );
  },

  verifySignature: (message, address, signature) => {
    let recoveredAddress = web3.eth.accounts.recover(message, signature);
    if (recoveredAddress.toLowerCase() === address) return true;
    return false;
  },

  getBalance: async (address) => {
    const result = await web3.eth.getBalance(address, (err) => {
      if (err) {
        throw ApiError.BadRequest("Error with balance!");
      }
    });
    return web3.utils.fromWei(result, "ether");
  },
};
