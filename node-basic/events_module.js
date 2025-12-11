const EventEmitter = require("events");

const emitter = new EventEmitter();
// Register a listener
// emitter.on("messageLogged", function () {
//   console.log("Listener called");
// });

// emitter.on("messageLogged", function (arg) {
//   console.log("Listener called", arg);
// });
emitter.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});
// Raise an event
// emitter.emit("messageLogged",1,'url');

// Raise an event with argument

emitter.emit("messageLogged", { id: 1, url: "http://" });

// const EventEmmiter = require("events");

// const emmiter = new EventEmmiter();
// Register a listener

// emmiter.on("messageLogged", function (arg) {
//   console.log("Listener called", arg);
// });

// // Raise an Event
// emmiter.emit("messageLogged", { id: 1, url: "http://" });

const Logger = require("./eventLogger");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

logger.log("Hello from Event logger");
