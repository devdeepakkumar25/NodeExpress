const fs = require("fs");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textIn);

// for (let i = 0; i < textIn.length; i++) {
//   console.log(textIn[i]);
// }

// const words = textIn.split(/\s+/);
// for (let word of words) console.log(word);

// const lines = textIn.split("\n");

// for (let line of lines) {
//   console.log("Line: ", line);

//   const words = line.split(/\s+/);
//   for (let word of words) {
//     console.log("   WORD: ", word);
//     for (let char of word) {
//       console.log("      CHAR:-", char);
//     }
//   }
// }

// const stream1 = fs.createReadStream("./txt/input.txt", {
//   encoding: "utf-8",
// });

// stream1.on("data", (chunk) => {
//   for (let char of chunk) {
//     console.log(char);
//   }
// });

// let buffer = "";

// const stream = fs.createReadStream("./txt/input.txt", {
//   encoding: "utf-8",
// });

// stream.on("data", (chunk) => {
//   buffer += chunk;
//   const words = buffer.split(/\s+/);
//   buffer = words.pop(); // keep last partial word

//   words.forEach((word) => console.log(word));
// });

// stream.on("end", () => {
//   if (buffer) console.log(buffer);
// });
// const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File Written");

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("your file has been written");
      });
    });
  });
});
console.log("Reading file....");
