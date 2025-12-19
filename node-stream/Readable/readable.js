const fs = require("fs");

function storeEvenNumbers() {
  const readable = fs.createReadStream("numbers.txt", {
    encoding: "utf-8",
  });

  let buffer = "";

  readable.on("data", (chunk) => {
    buffer += chunk;
    console.log(buffer);

    console.log("Initial Buffer: ", buffer);
    const lines = buffer.split("\n");

    buffer = lines.pop();

    console.log("Buffer after the poping: ", buffer);

    for (const line of lines) {
      console.log("line: ", line);
      const num = Number(line.trim());

      console.log("num", num);

      if (!isNaN(num) && num % 2 === 0) {
        fs.appendFileSync("event.txt", num + "\n");
      }
    }
  });
  readable.on("end", () => {
    console.log("finished processing numbers");
  });
  console.log(buffer);
}

// storeEvenNumbers();

const num = `1
2
3
4
5`;

const split = num.split("\n");
console.log(split);

async function storeEvenNumbersAsync() {
  const readable = fs.createReadStream("numbers.txt", {
    encoding: "utf8",
  });

  let buffer = "";

  try {
    for await (const chunk of readable) {
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        const num = Number(line.trim());

        if (!isNaN(num) && num % 2 === 0) {
          await fs.promises.appendFile("evenNum.txt", num + "\n");
        }
      }
    }

    if (buffer.trim() !== "") {
      const num = Number(buffer.trim());
      if (!isNaN(num) && num % 2 === 0) {
        await fs.promises.appendFile("evenNum.txt", num + "\n");
      }
    }
    console.log("Finished processing numbers");
  } catch (err) {
    console.log("Error: ", err);
  }
}

storeEvenNumbersAsync();
