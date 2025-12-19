// const writableStream = new WritableStream({
//   start(controller) {
//     console.log("Writable stream start");
//   },

//   write(chunk, controller) {
//     console.log("writing Chunk", chunk);
//   },
//   close(controller) {
//     console.log("Stream closed");
//   },
//   abort(error) {
//     console.log("Stream aborted: ", error);
//   },
// });

// (async () => {
//   const writer = writableStream.getWriter();

//   await writer.write("Hello");

//   await writer.write("world");
//   await writer.close();
// })();

const jsonStream = new WritableStream({
  start(controller) {
    console.log("Writable stream start");
  },

  write(chunk, controller) {
    // console.log("writing Chunk", chunk);

    const json = JSON.stringify(chunk);
    console.log("Sending json: ", json);
  },
  close(controller) {
    console.log("Stream closed");
  },
  abort(error) {
    console.log("Stream aborted: ", error);
  },
});

(async () => {
  const writer = jsonStream.getWriter();

  await writer.write("Hello");

  await writer.write("world");
  await writer.close();
})();
