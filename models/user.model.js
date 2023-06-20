const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
  deviceId: {
    type: String,
    require: true,
  },
  deviceModel: {
    type: String,
    require: true,
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
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports.userModel = mongoose.model("User", userSchema);
