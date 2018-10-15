

const logger = require("./logger");



module.exports = (ctx, next) => {
  return next()
    .then(() => {
      if(ctx.body===undefined){
        ctx.body = { code:404, message:"not found" };
      }
    }
    )
    .catch(err =>{
      if(err.status!==401){
        logger.error(err);
        ctx.status = 500;
        ctx.body = { code:500, message:err.message || "service error" };
      }
      else {
        ctx.body = { code:405, message:"token不存在或者无效!" };
      } 
    }) ;
};