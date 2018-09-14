

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{ type:String, default:null },
  password: { type:String, default: null },
  isAdmin:{ type:Boolean, default:false },
  team:{ type:Array, default:[] },
  docs: { type:Array, default:[]  },
  avatUrl: { type: String, default: null }
});

module.exports = mongoose.model("User", userSchema);