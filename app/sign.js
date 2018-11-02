"use strict";

const Router = require("koa-router");
const secret = require("../utils/secret");
const user = require("../models/User");
const sign = new Router({ prefix: "sign" });
const logger = require("../middlewares/logger");

/**
 * @api { post } /sign 注册
 * @apiGroup Sign
 * @apiPermission none
 * @apiParam { String } name 用户名
 * @apiParam { String } password 密码
 * @apiSuccess { Number } code 状态码
 * @apiSuccess { String } message 提示信息
 * @apiVersion 0.1.0
 */

sign.post("/", async ctx => {
  try {
    const { name, password } = ctx.request.body;
    if (!name || !password) {
      ctx.body = { code: 400, message: "缺少参数name或者password!" };
    } else {
      const obj = await user.findOne({ name });

      if (!obj) {
        await user.create({ name, password: secret(password) });
        ctx.body = { code: 201, message: "新增用户成功" };
      } else {
        ctx.body = { code: 401, message: "用户已存在" };
      }
    }
  } catch (err) {
    logger.error(err);
  }
});

/**
 * @api { get } /sign 验证用户名可否使用
 * @apiGroup Sign 
 * @apiParam { String }  name 用户名
 * @apiPermission none
 * @apiSuccess { Number } code 状态码
 * @apiSuccess { String } message 提示信息
 * @apiSuccess { Boolean } canUse 可否使用
 * @apiVersion 0.1.0
 */

sign.get("/", async ctx => {

  try {
    const { name } = ctx.query;
    if (!name) {
      ctx.body = { code: 400, message: "缺少参数name！" };
    } else {
      let obj = await user.findOne({ name });
      if (obj) {
        ctx.body = { code: 200, message: "name已存在！", canUse: false };
      } else {
        ctx.body = { code: 200, message: "name可以使用", canUse: true };
      }
    }
  } catch (err) {
    logger.error(err);
  }
});

module.exports = sign;