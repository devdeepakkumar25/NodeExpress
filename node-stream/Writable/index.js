const fs = require("node:fs/promises");
const fssync = require("fs");

const writeInFile = async () => {
  console.time("WriteMore");
  const fileHandle = await fs.open("test.txt", "w");
  for (let i = 0; i < 300; i++) {
    // await fileHandle.write(`${i}\n`);
    await fileHandle.write(`index ${i}\n `);
  }
  console.timeEnd("WriteMore");
};

// writeInFile();
const writeInFile2 = async () => {
  console.time("writeParallel");
  const fileHandle = await fs.open("test.txt", "a");
  const writes = [];
  for (let i = 0; i < 300; i++) {
    writes.push(fileHandle.write(`index ${i}\n`));
    console.log(writes);
  }
  await Promise.all(writes);

  await fileHandle.close();
  console.timeEnd("writeParallel");
};

// writeInFile2();

const writeFile3 = () => {
  console.time("writeMore");

  fssync.open("test.txt", "w", (err, fd) => {
    for (let i = 0; i < 50000; i++) {
      // fssync.write(fd, `index ${i}\n`, () => {});
      // fssync.writeSync(fd, `index ${i}\n`, () => {});
      const buff = Buffer.from(` ${i}\n`);
      fssync.writeSync(fd, buff);
    }
    console.timeEnd("writeMore");
  });
};

// writeFile3();

const writeInFile4 = async () => {
  console.time("WriteMore");
  const fileHandle = await fs.open("test.txt", "w");
  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 5000000; i++) {
    const buffer = Buffer.from(`index ${i}\n `);
    stream.write(buffer);
  }
  console.timeEnd("WriteMore");
};

// writeInFile4();

const writeInFile5 = async () => {
  console.time("WriteMore");
  const fileHandle = await fs.open("test.txt", "w");
  const stream = fileHandle.createWriteStream();
  // const buff = Buffer.from("Deepak");
  const buff = Buffer.alloc(1e8, 10);
  stream.write(buff);
  stream.write(buff);
  stream.write(buff);
  stream.write(buff);
  stream.write(buff);

  stream.write(buff);

  stream.write(buff);

  stream.write(buff);
  stream.write(buff);
  stream.write(buff);
  stream.write(buff);
  // stream.write(buff);
  // stream.write(buff);

  console.log(buff);
  console.log(`${stream.writableHighWaterMark / 1024}kb`);
  console.log(stream.writableLength);

  // for (let i = 0; i < 5000000; i++) {
  //   const buffer = Buffer.from(`index ${i}\n `);
  //   stream.write(buffer);
  // }
  console.timeEnd("WriteMore");
};

// writeInFile5();

const writeInFile6 = async () => {
  console.time("WriteMore");
  const fileHandle = await fs.open("test.txt", "w");
  const stream = fileHandle.createWriteStream();
  // const buff = Buffer.from("Deepak");
  // const buff = Buffer.alloc(65548, 10);
  const buff = Buffer.alloc(65528, 10);

  console.log(`${stream.writableHighWaterMark} bytes`);
  console.log(`${stream.writableHighWaterMark / 1024}kb`);
  console.log(stream.write(buff));
  console.log(buff);
  console.log(stream.write(Buffer.alloc(11110, 12)));
  console.log(stream.write(Buffer.alloc(11110, 12)));
  console.log(stream.write(Buffer.alloc(11110, 12)));
  stream.on("drain", () => {
    console.log(stream.writableLength);
    // const buff = Buffer.alloc(65537, 10);
    // console.log(stream.write(buff));
    console.log("You are now safe to right");
  });

  console.log(stream.writableLength);

  // for (let i = 0; i < 5000000; i++) {
  //   const buffer = Buffer.from(`index ${i}\n `);
  //   stream.write(buffer);
  // }
  console.timeEnd("WriteMore");
};

// writeInFile6();

const writeInFile7 = async () => {
  console.time("writeMore");

  const fileHandle = await fs.open("test.txt", "w");
  const stream = fileHandle.createWriteStream();

  let i = 0;
  const TOTAL = 50000000;

  const writeMany = () => {
    while (i < TOTAL) {
      const buffer = Buffer.from(`${i}\n`);

      if (i === TOTAL - 1) {
        return stream.end(buffer);
      }

      i++;

      // backpressure handling
      if (!stream.write(buffer)) {
        return;
      }
    }

    // all data written
    stream.end();
  };

  //  START writing
  writeMany();
  // resume writing when buffer drains
  // stream.on("drain", writeMany);
  let j = 1;
  stream.on("drain", () => {
    console.log(j);
    j++;
    writeMany();
  });

  // when fully finished
  stream.on("finish", async () => {
    console.timeEnd("writeMore");
    await fileHandle.close();
    console.log("Writing completed");
  });
};

writeInFile7();
