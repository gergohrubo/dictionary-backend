const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  word: {
    type: {},
    required: true
  },
  explanation: {
    type: {},
    required: true
  }
});
const Entry = mongoose.model("entri", entrySchema);
module.exports = Entry;