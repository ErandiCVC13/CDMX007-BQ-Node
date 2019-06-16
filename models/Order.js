const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model("Order", OrderSchema);
