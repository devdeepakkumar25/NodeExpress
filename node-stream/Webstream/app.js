const http = require("http");
const { Readable } = require("stream");

const server = http.createServer((req, res) => {
  if (req.url === "/stream" && req.method === "GET") {
    const words = [
      "hello ",
      "subscribers ",
      "welcome ",
      "to ",
      "leela web dev\n",
    ];

    let index = 0;

    const readable = new Readable({
      read() {
        if (index < words.length) {
          const word = words[index++];

          setTimeout(() => {
            this.push(word);
          }, 1000);
        } else {
          this.push(null);
        }
      },
    });

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Access-Control-Allow-Origin": "*",
    });

    readable.pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on http://localhost:3000/stream");
});
