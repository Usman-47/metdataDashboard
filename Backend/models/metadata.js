const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema(
  {
    Sex: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    dna: {
      type: String,
    },
    edition: {
      type: String,
    },
    date: {
      type: String,
    },
    attributes: [
      {
        trait_type: { type: String },
        value: { type: String },
      },
    ],
    compiler: {
      type: String,
    },
  },
  { timestamps: true }
);

const MetaData = mongoose.model("MetaData", metadataSchema);

module.exports = MetaData;
