const mongoose = require("mongoose");
const { Schema } = mongoose;

const typeSchema = new Schema(
    {
        trait_type: {
            type: String,
            unique: true
        },
        types: {
            type: Array,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("type", typeSchema);
