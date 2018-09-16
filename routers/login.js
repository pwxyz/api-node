

const Router = require("koa-router");
const secret = require("../utils/secret");
const user = require("../models/User");
const { cert } = require("../config");
const jsonwebtoken = require("jsonwebtoken");
const secert = require("../utils/secret");

const login = new Router({ prefix:"login" });


login.post("/", async (ctx) =>{
  const { name, password }= ctx.request.body;
  if(!name||!password){
    ctx.body = { code: 400, message:"缺少必要的参数" }
  }
  else {
    let obj = await user.findOne({ name }).select("name password isAdmin"); 

    const check = passwords => obj.password === secert(passwords)
    if(obj&&check(password)){
      let token = jsonwebtoken.sign({name: obj["name"] , _id: obj["_id"], isAdmin: obj["isAdmin"]  }, secret(cert), { expiresIn: "1d" });
      ctx.body = { code: 201, message:"ok", token};
    }
    else {
      ctx.body = { code:401, message:"用户名或者密码不正确" }
    }

  }
  
} );

module.exports = login