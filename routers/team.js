

const Router = require("koa-router");
const team = require("../models/Team");
const user = require("../models/User");
const pathTeam = new Router({ prefix:"team" });
// const logger = require("../utils/logger");



pathTeam.get("/", async ctx =>{
  let data = await team.find();
  ctx.body={ code:200, message:"获取信息成功", data };
});

pathTeam.post("/", async ctx => {
  const { _id, name } = ctx.request.body;
  const own = ctx.state.user._id;
  let data = await team.create({ own, members:[_id], name });
  // let userInfo = await user.findById(_id);
  await user.update({ teams: data._id });
  // await user.findByIdAndUpdate(_id, { team: data._id } );
  ctx.body = { code:200, message:"创建团队成功",data }; 
} );

pathTeam.get("/:id", async ctx=> {
  let id = ctx.params.id;
  let data = await team.findById(id);
  ctx.body = { code:200, message:"获取信息成功", data };
} );

pathTeam.post("/id", async ctx=> {
  let id = ctx.params.id;
  let { nameId } = ctx.request.body;
  if(!nameId||nameId===id){
    // await team.find
  }
  else{
    await team.findOneAndUpdate({ _id:id }, { $members:[nameId], new:true } );
    // await 
    ctx.body = { code:200, message:"新增成员成功" };
  }

} );


module.exports = pathTeam;