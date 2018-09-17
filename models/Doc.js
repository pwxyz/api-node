

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//文档从属性划分，分为公开与私有 
//从归属划分，分为个人与团队
//以上两种属性二选一，相互之间互不影响  
//当文档公开时，不需要权限，所有人均可浏览；
//当文档私有时，需要权限
//若为个人项目，则使用personalAuth，字段为数组ref
//若为团队项目，则团队内成员均可浏览，开发者才可以编辑；

const DocSchema = new Schema({
  author:{ ref:"User", type:Schema.Types.ObjectId, required:true },
  isPublic: { type:Boolean, default: true },
  belongTo: { type: String, enum:["team", "personal"], default:"team" },
  personalAuth: { ref: "User", type: Schema.Types.ObjectId, default:[]   },
  teamAuth:{ ref:"Team", type: Schema.Types.ObjectId, default:[] }
});

module.exports = mongoose.model("Doc", DocSchema);