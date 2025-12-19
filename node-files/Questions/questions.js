const fs = require("fs");
const text = "Hello, this is Node.js writing test!";

// fs.writeFileSync("sample.txt", "Hello");
// console.log("File written Synchronolusly");

// fs.writeFile("sample.txt", text, (err) => {
//   if (err) throw err;
//   console.log("Text written asynchronously!");
// });

// fs.readFile("sample.txt", "utf-8", (err, data) => {
//   if (err) throw err;

//   console.log("data length: ", data.length);
//   let lines = data.split("\n").length;

//   let words = data.split(/\s+/).filter((w) => w !== "").length;

//   let alphabets = data.replace(/[^a-zA-Z]/g, "").length;

//   console.log("Lines =", lines);
//   console.log("Words ", words);
//   console.log("Alphabet Count =", alphabets);
// });

// let buffer = Buffer.from([1, 2, 3, 4, 5]);

// fs.writeFile("binary_async.bin", buffer, (err) => {
//   if (err) throw err;

//   console.log("Binary data written asynchronously!");
// });

fs.readFile("numbers.txt", "utf-8", (err, data) => {
  if (err) throw err;

  let arr = data.split(/\s+/).map(Number);

  //   let result = arr[0] + arr[1];
  let result = arr.reduce((acc, curr) => acc + curr, 0);

  console.log("Addition result =", result);
});

fs.copyFile("sample.txt", "copy_async.txt", (err) => {
  if (err) throw err;

  console.log("File copied asynchronously!");
});
