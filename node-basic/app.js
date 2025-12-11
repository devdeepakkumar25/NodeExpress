const logger = require("./logger");

console.log(logger);

// logger = 1;
// logger.log("Deepak");

logger("Deepak");

// const log = require("./logger");
// const logger = require("./logger");
// const logger2 = require("./logger");

// console.log(log.log("message"));
// console.log(module);

// console.log(logger.log("Hello World"));
// logger2("hello from logger2");

// console.log(module);

const path = require("path");
const os = require("os");

const fs = require("fs");
console.log(path);

const pathObj = path.parse(__filename);

console.log(pathObj);

console.log(os.platform());

console.log(os.totalmem());

console.log(os.freemem());

const curr = fs.readdirSync("./");

console.log(curr);

const files = fs.readdir("./", function (err, files) {
  if (err) console.log(err);
  else console.log(files);
});

console.log(files);

const EventEmmiter = require("events");

const emmiter = new EventEmmiter();
// Register a listener
emmiter.on("messageLogged", function (arg) {
  console.log("Listener called", arg);
});

// Raise an Event
emmiter.emit("messageLogged", { id: 1, url: "http://" });
