// 1️⃣ TransformStream: converts text to UPPERCASE
const upperCaseTransform = new TransformStream({
  start() {
    console.log("Transform stream started");
  },

  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },

  flush() {
    console.log("Transform stream ended");
  },
});

// 2️⃣ ReadableStream: produces data
const readable = new ReadableStream({
  start(controller) {
    controller.enqueue("hello ");
    controller.enqueue("world");
    controller.close();
  },
});

// 3️⃣ WritableStream: consumes data
const writable = new WritableStream({
  write(chunk) {
    console.log("Output:", chunk);
  },
});

// 4️⃣ Pipe everything together
// readable.pipeThrough(upperCaseTransform).pipeTo(writable);

const encoder = new TextEncoderStream();
const decoder = new TextDecoderStream();
// readable.pipeThrough(upperCaseTransform).pipeTo(writable);

// readable.pipeThrough(upperCaseTransform).pipeTo(writable);
// readable.pipeThrough(encoder).pipeTo(writable);

readable.pipeThrough(encoder).pipeThrough(decoder).pipeTo(writable);
