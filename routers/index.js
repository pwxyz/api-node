
const Router = require("koa-router");
const user = require("../models/User");
const login = require("./login");
const config = require("./config");

const router = new Router();

router.get("/",  ctx => {
  ctx.body= { api:"welcome to web-api" };
});



router.use("/", login.routes(), login.allowedMethods() );
router.use("/", config.routes(), config.allowedMethods()  );

module.exports = router;