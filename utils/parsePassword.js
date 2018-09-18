
const secert = require("./secret");

const messages = ["数据格式错误","密码长度不得小于8位","密码中未包含数字", "密码中未包含小写字母", "密码中未包含大写字母"];
const avoidPath = ["/login"];

const check = str => {
  let strs = str+"";
  if(typeof strs!=="string"){
    return messages[0];
  }
  else if(strs.length<8){
    return messages[1];
  }
  else if(!(/[0-9]/.test(strs))){
    return messages[2];
  }
  else if(!(/[a-z]/.test(strs))){
    return messages[3];
  }
  else if(!(/[A-Z]/.test(strs))){
    return messages[4];
  }
  else return false;
};

module.exports = (ctx, next) =>{
  let body = ctx.request.body;
  if("password" in body){
    let message = check(body.password);
    if(!message||avoidPath.includes(ctx.request.url)){
      body.password = secert(body.password);
      return  next();
      
    }
    else {
      ctx.body = { code:202, message, xx: ctx.request };
    }
  }
  else return next();
};