const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("Document", documentSchema);
