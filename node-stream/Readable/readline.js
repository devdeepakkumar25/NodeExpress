const fs = require("fs");
const readline = require("readline");

async function readFileLineByLine() {
  const rl = readline.createInterface({
    input: fs.createReadStream("numbers.txt", { encoding: "utf-8" }),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log("Line:", line);
  }
}

readFileLineByLine();
