

const { soalt } = require("../config");
const crypto = require("crypto");

const comBindSoaltAndPassword = str => {
  let len = str.length;
  let length = soalt.length;
  let strs = "";
  for(let i = 0; i<len; i++){
    strs += str[i]+ soalt[i%length];
  }
  return strs;
};

const secret = str  => crypto.createHmac("sha256", comBindSoaltAndPassword(str) ).update("koa node").digest("hex");

module.exports = secret;