const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    guests: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true
        }
      ],
      default: []
    },
    img: {
      type: String,
      required: true
    },
    tickets_amount: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("event", eventSchema);