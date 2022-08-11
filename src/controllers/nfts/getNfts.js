const { OK } = require("../../constants/statusCode");
const { NftModel } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 30,
            sort = "asc",
            nftId = "",
            types = "",
            price,
        } = req.query;

        const query = {};

        if (nftId.length > 0)
            query.nftId = {
                $regex: nftId,
                $options: "i",
            };

        if (types.length > 0) {
            const typesArr = types.split(",");
            query.attributes = { $elemMatch: { value: { $in: typesArr } } };
        }

        const options = {
            skip: +limit * +page - +limit,
            limit,
        };

        const nfts = await NftModel.find(query, "-createdAt -updatedAt", options)

        res.status(OK).json({
            status: OK,
            message: "Successfully!",
            data: nfts,
        });
    } catch (error) {
        next(error);
    }
};
