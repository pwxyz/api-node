

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./routers");
const jwt = require("koa-jwt");
const { cert } = require("./config");
const secret = require("./utils/secret");

require("./db");

const app = new Koa();

app.use(function(ctx, next){
  return next().catch(err => {
    if(err.status ===401){
      ctx.body = { code:401, message:"token不存在或者无效!" };
    }
    else {
      throw err;
    }
  });
});


app.use(jwt({ secret: secret(cert),  passthrough: true  }));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());



// app.use( async (ctx) => {
//   ctx.body= { api:"this is api" };
// }); 

const port = 3002;

app.listen(port, () => console.log("this app is running on port:  " + port)  );

