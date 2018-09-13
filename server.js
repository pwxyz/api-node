

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./routers");
require("./db");

const app = new Koa();


app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// app.use( async (ctx) => {
//   ctx.body= { api:"this is api" };
// }); 

const port = 3002;

app.listen(port, () => console.log("this app is running on port:  " + port)  );

