const mongoose = require("mongoose");

//schema
const UrlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURl: {
    type: String,
    required: true,
  },
  visitHistory: [
    {
      timestamp: { type: Number },
    },
  ]

},{ timestamp:true});

//model
const URL = mongoose.model('url', UrlSchema);

//export
module.exports = URL;
