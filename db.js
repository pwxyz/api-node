
const mongoose = require("mongoose");
const db = mongoose.connection;

let url = "mongodb://localhost/web-node";

mongoose.connect(url);
mongoose.connect(url, { useNewUrlParser: true });

db.on("error", console.error.bind(console, "connect error") );
db.once("open", () =>  console.log("mongoose opened!"));




// const mongoose = require('mongoose')
//     , db = mongoose.connection

// mongoose.Promise = global.Promise

// mongoose.connect('mongodb://localhost/teach')

// db.on('error', console.error.bind(console, 'connect error:'))

// db.once('open', () => {
//   console.log('mongoose opened!')
// })