const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  status: String,
  items: [
    { name: { type: String, unique: true, required: true }, price: Number }
  ]
  // name: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true
  // },
  // price: {
  //   type: Number,
  //   required: true,
  //   trim: true
  // },
  // items: {
  //   type: Number,
  //   required: true,
  //   trim: true
  // }

  // "status": "pending",
  //       "_id": "5bbd015af67d99005049bf4e",
  //       "items": [
  //           {
  //               "_id": "5bbd015af67d99005049bf4f",
  //               "name": "Capuccino",
  //               "price": 5
  //           }
  //       ],
  //       "createdAt": "2018-10-09T19:28:26.603Z",
  //       "createdBy": "5bbceca6dccfd3005056dd52"
});

module.exports = mongoose.model("Order", OrderSchema);
