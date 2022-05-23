const axios = require("axios");
const { OPENSEA_KEY } = require("../../config");
const { ApiError } = require("../../errors");
const { OK } = require("../../constants/statusCode");

module.exports = async (req, res, next) => {
  try {
    const { user } = req;

    const resp = await axios({
      method: "get",
      url: `https://api.opensea.io/api/v1/assets?owner=${user.publicAddress}&order_direction=desc&offset=0&limit=1&collection_slug=proof-moonbirds`,
      headers: { "X-API-KEY": OPENSEA_KEY },
    });

    const nfts = resp.data.assets;
    if (nfts.length == 0) {
      throw ApiError.BadRequest("No nfts found!");
    }

    res.status(OK).json({
      status: OK,
      message: "Successfully!",
      qrTimeGenerated: new Date(),
      data: nfts[0],
    });
  } catch (error) {
    next(error);
  }
};
