

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{ type:String, default:null },
  password: { type:String, default: null }
});

module.exports = mongoose.model("User", userSchema);