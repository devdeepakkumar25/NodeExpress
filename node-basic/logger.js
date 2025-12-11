// var x = ;
// // (function (exports, require, module, __filename, __dirname) {});

// console.log(__filename);
// console.log(__dirname);
// var url = "http://mylogger.io/log";

// function log(message) {
//   // send an HTTP request

//   console.log(message);
// }
// log("Deeapk");
// //   module.exports = log;
// // module.exports.log = log;

// // module.exports.url = url;

// // module.exports.endPoint = url;

var url = " http://mylogger.io/log";

function log(message) {
  console.log("log: ", message);
}

function log2(message) {
  console.log("log2: ", message);
}
module.exports = log2;

module.exports.log = log;

module.exports.url = url;

module.exports.endPoint = url;
