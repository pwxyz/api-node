

const Router = require("koa-router");
const secret = require("../utils/secret");
const user = require("../models/User");
const { cert } = require("../config");
const jsonwebtoken = require("jsonwebtoken")

const login = new Router({ prefix:"login" });


login.post("/", async (ctx) =>{
  const { name, password }= ctx.request.body;
  if(!name||!password){
    ctx.body = { code: 400, message:"缺少必要的参数" }
  }
  else {

    let obj = await user.findOne({ name }).select("name isAdmin"); 
    let token = jsonwebtoken.sign({name: obj["name"] , _id: obj["_id"], isAdmin: obj["isAdmin"]  }, secret(cert), { expiresIn: "1d" });
    ctx.body = { code: 200, message:"ok", obj, token};
  }
  
} );

module.exports = login