const mongoose = require("mongoose");
const { Schema } = mongoose;

const nftSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        image: {
            type: String,
        },
        nftId: {
            type: String,
            unique: true,
        },
        tokenId: {
            type: String,
        },
        rank: {
            type: Number,
        },
        attributes: {
            type: Array,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("nft", nftSchema);
