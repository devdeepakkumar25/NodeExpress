const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  //   res.write("Hello From the server");
  //   console.log(req);
  console.log(req.url);
  res.end("Hello From the server");
});

// 127.0.0.1
server.listen(8000, "127.0.0.1", () => {
  console.log(`Server is listening on http://127.0.0.1:${8000}`);
});

// const PORT = 8000;

// const HOST = "127.0.0.1";

// server.listen(PORT, HOST, () => {
//   console.log(`Server running at http://${HOST}:${PORT}`);
// });
