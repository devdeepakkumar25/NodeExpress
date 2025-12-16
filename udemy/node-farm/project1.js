const http = require("http");
const path = require("path");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  //   res.end("Hello from server project1");

  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("this is product");
  } else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   console.log(productData);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data);
    // });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
    // res.end("API");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world", //custom
    });
    // res.end("Page not found!");
    res.end("<h1>Page not found!.</h1>");
  }
});

const PORT = 3000;

const HOST = "127.0.0.1";

server.listen(PORT, HOST, () => {
  console.log(`server is listening on http://${HOST}:${PORT}`);
});
