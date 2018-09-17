

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{ type:String, default:null },
  password: { type:String, default: null },
  isAdmin:{ type:Boolean, default:false },
  teams:[{ 
    ref:"Team", type:Schema.Types.ObjectId, default:null, require:true 
  }],
  docs: { type:Array, default:[]  },
  avatUrl: { type: String, default: null }
}, { timestamps:true });

module.exports = mongoose.model("User", userSchema);