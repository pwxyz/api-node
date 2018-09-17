

const Router = require("koa-router");
const secret = require("../utils/secret");
const user = require("../models/User");
const sign = new Router({ prefix:"sign" });
const logger = require("../utils/logger");


sign.post("/", async (ctx) => {
  try{
    const { name, password } = ctx.request.body;
    if(!name||!password){
      ctx.body = { code:400, message:"缺少参数name或者password!" };
    }
    else{
      const obj = await user.findOne({ name });

      if(!obj){
        await user.create({ name, password: secret(password) });
        ctx.body = { code:201, message:"新增用户成功" };
      }
      else{
        console.log("xx");
        ctx.body = { code: 401, message:"用户已存在" };
      }
    }
  }
  catch(err){
    logger.error(err);
  }
});

sign.get("/", async ctx => {
  
  try{
    const { name } = ctx.query;
    if(!name){
      ctx.body = { code:400, message:"缺少参数name！" };
    }
    else{
      let obj = await user.findOne({ name });
      if(obj){
        ctx.body = { code:200, message:"name已存在！", canUse:false  };
      }
      else{
        ctx.body = { code:200, message:"name可以使用", canUse:true  };
      }
    }
  }
  catch(err){
    logger.error(err);
  }
} );

module.exports = sign;