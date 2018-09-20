

const Router = require("koa-router");
const team = require("../models/Team");
const user = require("../models/User");
const isArray = require("lodash/isArray");
const pathTeam = new Router({ prefix:"team" });


//获取所有团队信息
pathTeam.get("/", async ctx =>{
  // await team.remove({});
  let data = await team.find().populate("members.info");
  // let users = await user.find();
  ctx.body={ code:200, message:"获取信息成功", data };
});

//获取已加入的所有团队信息
pathTeam.get("/self", async ctx => {
  const { _id } = ctx.state.user;
  let data = await team.find({ members:_id });
  ctx.body = { code:200, message:"获取所属团队成功", data }
} );

//创建新的团队
pathTeam.post("/", async ctx => {
  const {  name, logo, abstract } = ctx.request.body;
  const _id = ctx.state.user._id;
  if(!name){
    ctx.body = { code:200, message:"参数格式不正确" };
  }
  else {
    // let membersArr = members.concat({  })
    let data = await team.create({ members:{ info: _id, kind:2 }, name, logo, abstract });
    // await user.update({ teams: data._id });
    ctx.body = { code:200, message:"创建团队成功",data }; 
  }

} );

//获取传入的当前团队信息
pathTeam.get("/:id", async ctx=> {
  let id = ctx.params.id;
  let data = await team.findById(id);
  ctx.body = { code:200, message:"获取信息成功", data };
} );

//给团队新增成员
pathTeam.post("/:id", async ctx=> {
  let id = ctx.params.id;
  console.log("post", id);
  let { membersArr } = ctx.request.body;
  if(!isArray(membersArr)||!("info" in membersArr[0])||!("kind" in membersArr[0]) ){
    ctx.body = { code:400, message:"参数格式不正确" };
  }
  else{
    // let data=  await team.findOneAndUpdate({ _id:id }, { $push:{ members:membersArr } }, { new:true } );
    let data=  await team.findOneAndUpdate({ _id:id }, { $addToSet:{ members:{ $each: membersArr} } }, { new:true } );
    if(data){
      ctx.body = { code:200, message:"新增成员成功", data };
    }
    else {
      ctx.body = { code:400, message:"新增成员失败，无效的_id" };
    }
  }

} );

pathTeam.delete("/id", async ctx => {
  let id = ctx.params.id;
  // let {  }
});

//更新团队信息
pathTeam.put("/:id", async ctx=> {
  let id = ctx.params.id;
  let { _id } = ctx.query.body;
  if(!_id){
    ctx.body = { code:400, message:"缺少必要的参数" };
  }
  else {
    // let obj = await team.findOne(id);
    // if(!obj._id){
    //   ctx.body = { code:400, message:"团队id不正确" };
    // }
    // else {

    // }
    await team.findByIdAndUpdate(id, {  });
  }
} );


module.exports = pathTeam;