
const queryStringToObj = require("../utils/queryStringToObj");

module.exports = (ctx, next) => {
  ctx.state.url = queryStringToObj(ctx.url);
  return next()
}