const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const stickerSchema = Schema({
  name: { type: String, required: true },
  position: { type: String, enum: ["small", "full-line"], required: true },
  type: {
    type: String,
    enum: [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "top",
      "bootom",
    ],
    required: true,
  },
});

module.exports.stickerSchema = stickerSchema;
