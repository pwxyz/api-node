
const logger = require("./logger");

module.exports = (ctx , next) =>{
  try{
    let obj = ctx.state.user;
    if(obj&&!obj.isAdmin){
      return ctx.body = { code:406, message:"权限不足！！" };
    }
    else{
      return  next();
    }
  }
  catch (err){
    logger.error(err);
  }
};