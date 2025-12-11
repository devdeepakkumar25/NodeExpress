const os = require("os");

var totalMemory = os.totalmem();

var freeMemory = os.freemem();

console.log(totalMemory);

console.log(freeMemory);

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
