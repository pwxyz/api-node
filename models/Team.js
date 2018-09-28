

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//members 存储团队所有成员信息
//own  团队归属者，最高权限,
//teamAdmin  团队管理员，其必须属于members中的一员

const TeamSchema = new Schema({
  name:{ 
    type:String, 
    required:true 
  }, 
  logo:{ 
    type:String, 
    default:null 
  },
  abstract:{ 
    type:String, 
    default:null 
  },
  own: { 
    type:Schema.Types.ObjectId, ref:"User", 
    required:[true, "own 必须是members中的一员"], 
    validate:{
      validator: function(id){
        return this.members.indexOf(id)!==-1 ;
      }
    } 
  },
  teamAdmin:[{  
    type:Schema.Types.ObjectId, 
    ref:"User", default:null, 
    validate:{
      validator: function(id){
        return this.members.indexOf(id)!==-1 ;
      }
    } 
  }],
  members:[{
    type:Schema.Types.ObjectId, 
    ref:"User", 
    default:null
  }]
}, { timestamps:true });

module.exports = mongoose.model("Team", TeamSchema);