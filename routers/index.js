
const Router = require("koa-router");
// const user = require("../models/User");
const login = require("./login");
const config = require("./config");
const sign = require("./sign");
const team = require("./team");

const parsePassword = require("../utils/parsePassword");

const checkAdmin = require("../utils/checkAdmin");

const router = new Router();

router.get("/",  ctx => {
  ctx.body= { api:"welcome to web-api" };
});

// router.get("/", function(ctx){
//   ctx.body = { api:"this is api" };
// })



router.use("/", parsePassword, login.routes(), login.allowedMethods() );
router.use("/", checkAdmin, config.routes(), config.allowedMethods()  );
router.use("/",parsePassword, sign.routes(), sign.allowedMethods()  );
router.use("/", team.routes(), team.allowedMethods()  );

module.exports = router;