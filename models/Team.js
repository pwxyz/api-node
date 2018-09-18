

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  own:{ type:Schema.Types.ObjectId, ref:"User", required:true },
  name:{ type:String, required:true }, 
  logo:{ type:String, default:null },
  teamAdmin: { type:Schema.Types.ObjectId, ref:"User", default:null },
  members:[{
    type:Schema.Types.ObjectId, ref:"User", default:null
  }]
}, { timestamps:true });

module.exports = mongoose.model("Team", TeamSchema);