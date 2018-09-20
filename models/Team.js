

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//团队成员级别
// 0 普通成员
// 1 管理员
// 2 所有者

const TeamSchema = new Schema({
  name:{ type:String, required:true }, 
  logo:{ type:String, default:null },
  abstract:{ type:String, default:null },
  members:[{
    info:{type:Schema.Types.ObjectId, ref:"User", default:null},
    kind: { type:Number, default:0 }
  }]
}, { timestamps:true });

module.exports = mongoose.model("Team", TeamSchema);