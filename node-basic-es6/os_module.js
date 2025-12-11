import os from "os";

var totalMemory = os.totalmem();

var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Info:", os.cpus());
console.log("Home Directory:", os.homedir());
console.log("Uptime (sec):", os.uptime());
console.log("Host Name:", os.hostname());
console.log("Temp Dir:", os.tmpdir());
