const { OK } = require("../../constants/statusCode");
const { TypeModel } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const data = await TypeModel.find({}, "-createdAt -updatedAt")
        res.status(OK).json({ status: OK, data });
    } catch (error) {
        next(error);
    }
};