const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  deviceModel: {
    type: String,
    required: true,
  },
  verificationDocs: [
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
  whatsappNumber: {
    type: String,
    default: null,
  },
  verification: {
    type: Boolean,
    default: false,
  },
  typeOfUser: {
    type: String,
    default: "general",
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports.userModel = mongoose.model("User", userSchema);
