const axios = require("axios");
const { OPENSEA_KEY } = require("../../config");
const { OK } = require("../../constants/statusCode");

module.exports = async (req, res, next) => {
  try {
    const { collection, limit = 20, cursor = null } = req.query;
    let searchString = `https://api.opensea.io/api/v1/assets?order_direction=desc&include_orders=false&limit=${limit}&collection_slug=${collection}`;
    if (cursor) {
      searchString = `https://api.opensea.io/api/v1/assets?order_direction=desc&include_orders=false&limit=${limit}&collection_slug=${collection}&cursor=${cursor}`;
    }

    const resp = await axios({
      method: "get",
      url: searchString,
      headers: { "X-API-KEY": OPENSEA_KEY, Host: "api.opensea.io" },
    });

    const nfts = resp.data;

    res.status(OK).json({
      status: OK,
      message: "Successfully!",
      data: nfts,
    });
  } catch (error) {
    next(error);
  }
};
