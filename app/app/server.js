"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const cors = require("koa-cors");

// const Koa = require("koa");

const bodyParser = require("koa-bodyparser");
const router = require("./routers");
const jwt = require("koa-jwt");
const { cert } = require("./config");
const secret = require("./utils/secret");
const catchErr = require("./middlewares/catchErr");

require("./db");

const app = new _koa2.default();

app.use(catchErr);
// app.use(swagger.init(swaggerInit));
app.use(cors());
app.use(jwt({ secret: secret(cert) }).unless({ path: [/(^\/public)|(^\/sign$)|(^\/login$)/] }));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

// app.use( async (ctx) => {
//   ctx.body= { api:"this is api" };
// }); 

const port = 3002;

app.listen(port, () => console.log("this app is running on port:  " + port));