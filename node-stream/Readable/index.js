const fs = require("node:fs/promises");

const readableFun1 = async () => {
  // const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleRead = await fs.open("file-huge.txt");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    // highWaterMark: 400,
    // highWaterMark: 65538,
  });

  const steamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    console.log(chunk.length);
    // console.log(chunk);
    steamWrite.write(chunk);
  });
};

// readableFun1();

const readableFun2 = async () => {
  const fileHandleRead = await fs.open("file-huge.txt");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream();

  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }

    streamWrite.on("drain", () => {
      streamRead.resume();
    });

    console.log(chunk.length);
    // console.log(chunk);
    streamWrite.write(chunk);
  });
};

// readableFun2();

const readableFun3 = async () => {
  const fileHandleRead = await fs.open("numbers.txt");
  const fileHandleWrite = await fs.open("evenNum.txt", "w");

  const streamRead = fileHandleRead.createReadStream();

  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    // console.log(chunk.toString("utf-8"));

    let numbers = chunk.toString().split("\n");

    console.log("------------");

    console.log(numbers[numbers.length - 2]);
    console.log(numbers[numbers.length - 1]);
    console.log(numbers[0]);

    // console.log(numbers[0]);
    // if (numbers) {
    //   console.log(typeof numbers[0]);
    //   console.log(typeof Number(numbers[0]));
    // }

    const firstNumber = +numbers[0];
    const secondNumber = +numbers[1];

    if (firstNumber + 1 !== secondNumber) {
      numbers[0] = split.toString().trim() + firstNumber.toString().trim();
    }

    const lastNumber = +numbers[numbers.length - 1];
    const secondLastNumber = +numbers[numbers.length - 2];

    if (lastNumber - 1 !== secondLastNumber) {
      numbers.pop();
      split = lastNumber;
    }

    numbers.forEach((number) => {
      if (number % 10 === 0) {
        if (!streamWrite.write(" " + number + "/n")) {
          streamRead.pause();
        }
      }
    });

    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }

    streamWrite.on("drain", () => {
      streamRead.resume();
    });

    console.log(chunk.length);
    // console.log(chunk);
    streamWrite.write(chunk);
  });
};

// readableFun3();

const readableFun4 = async () => {
  const fileHandleRead = await fs.open("numbers.txt", "r");
  const fileHandleWrite = await fs.open("evenNum.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    encoding: "utf-8",
  });

  const streamWrite = fileHandleWrite.createWriteStream();

  let leftover = ""; // stores partial line between chunks

  streamRead.on("data", (chunk) => {
    // combine leftover + new chunk
    const data = leftover + chunk;

    // split by newline
    const lines = data.split("\n");

    // last line may be incomplete → save it
    leftover = lines.pop();

    for (const line of lines) {
      const num = Number(line.trim());

      if (!Number.isNaN(num) && num % 2 === 0) {
        if (!streamWrite.write(num + "\n")) {
          streamRead.pause();
        }
      }
    }
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });

  streamRead.on("end", () => {
    // process leftover if exists
    if (leftover) {
      const num = Number(leftover.trim());
      if (!Number.isNaN(num) && num % 2 === 0) {
        streamWrite.write(num + "\n");
      }
    }

    streamWrite.end();
  });

  streamWrite.on("finish", async () => {
    await fileHandleRead.close();
    await fileHandleWrite.close();
    console.log("Even numbers written successfully");
  });
};

// readableFun4();

// const fs = require("fs/promises");

const readableFun5 = async () => {
  console.log("Function started");

  const fileHandleRead = await fs.open("numbers.txt", "r");
  const fileHandleWrite = await fs.open("evenNum.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    encoding: "utf-8",
  });

  const streamWrite = fileHandleWrite.createWriteStream();

  let leftover = "";

  streamRead.on("data", (chunk) => {
    console.log("Chunk received");

    const data = leftover + chunk;
    const lines = data.split("\n");
    leftover = lines.pop();

    for (const line of lines) {
      const num = Number(line.trim());

      if (!Number.isNaN(num) && num % 2 === 0) {
        if (!streamWrite.write(num + "\n")) {
          streamRead.pause();
        }
      }
    }
  });

  streamWrite.on("drain", () => {
    console.log("Drain event");
    streamRead.resume();
  });

  streamRead.on("end", () => {
    console.log("Read stream ended");

    if (leftover) {
      const num = Number(leftover.trim());
      if (!Number.isNaN(num) && num % 2 === 0) {
        streamWrite.write(num + "\n");
      }
    }

    streamWrite.end();
  });

  streamWrite.on("finish", async () => {
    console.log("Even numbers written successfully");
    await fileHandleRead.close();
    await fileHandleWrite.close();
  });

  // 🔴 VERY IMPORTANT: error handlers
  streamRead.on("error", console.error);
  streamWrite.on("error", console.error);
};

readableFun5().catch(console.error);
