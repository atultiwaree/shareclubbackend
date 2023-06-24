const mongoose = require("mongoose");

const requirementSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requirement: {
    type: String,
    required: true,
  },
});

module.exports.reqModel = mongoose.model("Requirement", requirementSchema);
