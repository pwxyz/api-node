

const api_data = require("./apidoc/api_data.json");
const { chain,  zipObject } =require("lodash");

const groupUrl = arr => chain(arr).groupBy("url").toPairs().map(i => zipObject(["url", "verbs"], i)).value()

// const 
// const path 


console.log(JSON.stringify(groupUrl(api_data), null ,2 ));