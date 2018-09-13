
const Router = require("koa-router");
const user = require("../models/User");

const router = new Router();

router.get("/", async ctx => {
  let data =  await user.find() 
  // user.creat({ name:"admin", pas })
  ctx.body= { api:"welcome to web-api", req: ctx.request, data };
});



module.exports = router;