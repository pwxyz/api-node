"use strict";

const dayjs = require('dayjs');
const Router = require("koa-router");
const team = require("../models/Team");
const user = require("../models/User");
const pathTeam = new Router({ prefix: "team" });
const checkArg = require("../utils/checkArg");
const { limit } = require("../config");

/**
 * @apiDefine team  团队成员信息
 * @apiSuccess { Object[]} data 
 * @apiSuccess { String } data.logo  团队logo.
 * @apiSuccess { String } data.abstract 团队介绍.
 * @apiSuccess { String } data.name 团队名
 * @apiSuccess { Object[] } data.member 成员
 * @apiSuccess { string } data.mamber.name 成员名
 */

/**
 * @apiDefine teamPermission  团队管理权限
 * 团队管理员或者所有者，注意：只有团队所有者才能修改own信息
 */

/**
 * @api {get} /team 获取所有团队信息
 * @apiGroup Team
 * @apiHeader {String} Authorization 登陆后返回的token 
 * @apiPermission token
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} message 提示信息.
 * @apiUse team
 * @apiSampleRequest /team
 */
const queryStringToObj = require("../utils/queryStringToObj");
pathTeam.get("/", async ctx => {
  // await team.remove({});
  const limits = ctx.params.limit || limit;
  const page = ctx.params.page || 1;
  console.log(limits, page, queryStringToObj(ctx.request.url));
  let data = await team.find().populate("members own");
  // let users = await user.find();
  ctx.body = { code: 200, message: "获取信息成功", data };
});

//获取已加入的所有团队信息
pathTeam.get("/self", async ctx => {
  const { _id } = ctx.state.user;
  let data = await team.find({ members: _id });
  ctx.body = { code: 200, message: "获取所属团队成功", data };
});

/**
 * @api {post} /team 创建新的团队
 * @apiGroup Team
 * @apiHeader {String} Authorization 用户token 
 * @apiParam { String } name 团队名
 * @apiParam { String } [logo] 团队logo,图片url
 * @apiParam { String } [abstract] 团队宣传格言或介绍
 * @apiPermission token
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} message 提示信息.
 * @apiUse team
 * @apiSampleRequest /team
 * @apiVersion 0.1.0
 */
pathTeam.post("/", async ctx => {
  const { name, logo, abstract } = ctx.request.body;
  const _id = ctx.state.user._id;
  if (!name) {
    ctx.body = { code: 401, message: "name为必填项" };
  } else {
    // let membersArr = members.concat({  })
    let checkArr = await team.find({ name });
    if (checkArr && checkArr.length) {
      ctx.body = { code: 400, message: "该团队名已存在！！！" };
    } else {
      let data = await team.create({ members: _id, own: _id, name, logo, abstract });
      // await user.update({ teams: data._id });
      ctx.body = { code: 200, message: "创建团队成功", data };
    }
  }
});

/**
 * @api {get} /team/:id 获取单个团队信息
 * @apiGroup Team
 * @apiHeader {String} Authorization 用户token 
 * @apiParam { String } id 团队id
 * @apiPermission token
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} message 提示信息.
 * @apiUse team
 * @apiSampleRequest /team
 * @apiVersion 0.1.0
 */
pathTeam.get("/:id", async ctx => {
  let id = ctx.params.id;
  let data = await team.findById(id);
  ctx.body = { code: 200, message: "获取信息成功", data };
});

/**
 * @api {post} /team/:id 修改团队信息
 * @apiGroup Team
 * @apiHeader {String} Authorization 用户token 
 * @apiParam { String } [own] 团队所有者,_id
 * @apiParam { String[] } [teamAdmin] 团队管理者
 * @apiParam { String } [name] 团队名
 * @apiParam { String } [logo] 团队logo,图片url
 * @apiParam { String } [abstract] 团队宣传格言或介绍
 * @apiPermission teamPermission 
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} message 提示信息.
 * @apiUse team
 * @apiSampleRequest /team
 * @apiVersion 0.1.0
 */
pathTeam.post("/:id", async ctx => {
  let id = ctx.params.id;

  let { own, name, logo, abstract, teamAdmin } = ctx.request.body;
  let _id = ctx.state.user._id;
  let selectTeam = await team.findById(id);
  if (selectTeam.own.toString() === _id) {
    //团队拥有者，可以修改团队拥有者，管理员
    let obj = checkArg({ own, name, logo, abstract });

    let objArr = checkArg({ teamAdmin });
    let objs = {};
    if (Object.keys(objArr).length) {
      objs["$addToSet"] = Object.assign({}, objArr);
    }
    if (Object.keys(obj).length) {
      objs["$set"] = Object.assign({}, obj);
    }
    if (Object.keys(objs).length === 0) {
      ctx.body = { code: 400, message: "参数不正确" };
    } else {
      let data = await team.findByIdAndUpdate(id, objs, { new: true, runValidators: true });
      ctx.body = { code: 201, message: "修改成功", data };
    }
  } else if (selectTeam.teamAdmin.map(i => i.toString()).indexOf(_id) !== -1) {
    //团队管理者，可以修改除了拥有者，管理者之外的信息
    let data = await team.findByIdAndUpdate(id, { name, logo, abstract }, { new: true });
    ctx.body = { code: 201, message: "修改成功", data };
  } else {
    ctx.body = { code: 400, message: "权限不足，不是该团队的管理者或者所有者" };
  }
});

//更新团队信息
pathTeam.put("/:id", async ctx => {
  let id = ctx.params.id;
  let { _id } = ctx.query.body;
  if (!_id) {
    ctx.body = { code: 400, message: "缺少必要的参数" };
  } else {
    // let obj = await team.findOne(id);
    // if(!obj._id){
    //   ctx.body = { code:400, message:"团队id不正确" };
    // }
    // else {

    // }
    await team.findByIdAndUpdate(id, {});
  }
});

module.exports = pathTeam;