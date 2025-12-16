const EventEmitter = require("events");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items in stock.`);
});

myEmitter.emit("newSale", 9);

// const myEmitter = new EventEmitter();
// myEmitter.on("newSale", () => {
//   console.log("There was a new sale!");
// });

// myEmitter.on("newSale", () => {
//   console.log("Customer name: Jonas");
// });

// myEmitter.on("newSale", (stock) => {
//   console.log(`There are now ${stock} items left in stock.`);
// });

// myEmitter.emit("newSale", 9);
