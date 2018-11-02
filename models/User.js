

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

const User = mongoose.model("User", userSchema);

userSchema.index({_id:1})

User.on('index', function(error) {
  // "_id index cannot be sparse"
  console.log(error);
});

module.exports = User