

//用来

module.exports = obj => {
  let objs = {};
  for(let key in obj){
    if(typeof obj[key]!=="undefined"){
      objs[key] = obj[key];
    }
  }
  return objs;
};