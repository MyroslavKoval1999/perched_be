const Web3 = require("web3");
const { ApiError } = require("../errors");
const { NftModel, TypeModel } = require("../models");
const data = require("../json/moonbirds_nfts.json");


module.exports = {
    addNfts: async () => {
        const data = require('../json/moonbirds_nfts.json')
        // await NftModel.create(data[0]).catch(() => {})
        for (const item of data) {
            NftModel.create(item)
                .then(() => console.log(`Create ${item.name}`))
                .catch(() => {})
        }

        return
    },

    addTypes: async () => {
        const data = require('../json/moonbirds_types.json')
        for (const item of data) {
            TypeModel.create(item)
                .then(() => console.log(`Create ${item.trait_type}`))
                .catch(() => {})
        }

        return
    },
};
