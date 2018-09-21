
//简易复制obj
module.exports = obj => {
  if(typeof obj !=="object"){
    throw new Error("copy.js函数主要用来复制简单类型object");
  }
  else {
    return JSON.parse(JSON.stringify(obj));
  }
};