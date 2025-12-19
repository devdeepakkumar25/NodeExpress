const numberStream = new ReadableStream({
  start(controller) {
    let count = 1;
    const interval = setInterval(() => {
      if (count > 5) {
        controller.close();
        clearInterval(interval);
      } else {
        const chunk = `${count}\n`;
        controller.enqueue(chunk.trim());
        count++;
      }
    }, 1000);
  },
});

const reader = numberStream.getReader();

async function readStream() {
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(`Received: ${value}`);
  }
}

readStream();
