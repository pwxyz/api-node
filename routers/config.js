

const Router = require("koa-router");
const user = require("../models/User");
const config = new Router({ prefix:"config" });
const secret = require("../utils/secret");

const USER = "/user";

config.post(USER, async ctx => {
  const { name, password } = ctx.request.body;
  // const err = 
  try{
    let data = await user.findOne({ name });
    if(data){
      ctx.body = { code:202, message:"当前用户名已存在！" };
    }
    else {
      await user.create({ name, password: secret(password) });
      ctx.body = { code:201, message: "用户新增成功！", data };
    }
    
  }
  catch(err){
    console.log(err);
  }
});

config.delete(USER, async (ctx) => {
  const { _id } = ctx.request.body;
  await user.findByIdAndRemove(_id);
  ctx.body = { code:201, message:"删除用户成功!" };
});

config.put(USER, async (ctx) => {
  const { _id, ...obj } = ctx.request.body;
  if(!_id){
    ctx.body= { code:400, message:"缺少参数: _id!" };
  }
  else{
    await user.findByIdAndUpdate(_id, obj);
    let data = await  user.find();
    ctx.body = { code:401, message:"修改信息成功", data };
  }
  
} );

config.get(USER, async (ctx) => {
  console.log(ctx.state);
  let data = await user.find().select("password name");
  ctx.body = {  code:200, message:"获取用户成功", data };
} );

module.exports = config;