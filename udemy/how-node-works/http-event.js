const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request received!");

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Request Recevied");
  console.log(req.url);
  console.log("It ia another request");
});

server.on("close", () => {
  console.log("Server is closed");
});

server.on("error", (err) => {
  console.error("Server error:", err.message);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
