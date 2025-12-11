const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    // emit from THIS instance, not an unrelated emitter
    this.emit("messageLogged", {
      id: 1,
      url: "http://test.com",
      message,
    });
  }
}

module.exports = Logger;

// function log(message) {
//   console.log(message);

//   emmiter.emit("messageLogged: ", {
//     id: 1,
//     url: "http://test.com",
//     message: message,
//   });
// }

// module.exports = log;
