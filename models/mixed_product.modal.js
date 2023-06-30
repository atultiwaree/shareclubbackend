const mongoose = require("mongoose");

const mixedProductSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  productImages: [
    {
      imageType: {
        type: String,
        default: null,
      },
      path: {
        type: String,
        default: null,
      },
    },
  ],
});

module.exports.mixedProductModal = mongoose.model("MixedProduct", mixedProductSchema);
