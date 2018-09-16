

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  own:{ type:String, required:true },
  teamAdmin: { type: String, default:null },
  member:{ type:Array, default:[] }
});

module.exports = mongoose.model("Team", TeamSchema);