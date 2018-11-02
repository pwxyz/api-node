

const queryString = require("querystring");

const canParseNumber = arg => !!arg&&(+arg === +arg + 0);

const parseValue = value => {
  if(value==="true"){
    return true;
  }
  else if(value==="false"){
    return false;
  }
  else if(canParseNumber(value)){
    return +value;
  }
  else return value;
};


module.exports = url => {
  let arr = url.split("?");
  if(arr.length!==2){
    return {};
  }
  else {
    let obj = queryString.parse(arr[1]);
    for(let key in obj){
      obj[key] = parseValue(obj[key]);
    }
    return obj;
  }
};