const mongoose = require("mongoose");

async function connectToMongoDb(fileName) {
  return mongoose.connect(fileName);
}

module.exports = { connectToMongoDb };
