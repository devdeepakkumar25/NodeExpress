const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const replaceTemplate = require("./module.js/replaceTemplate");

/* ================================
   FILE PATHS
================================ */
const templatesDir = path.join(__dirname, "templates");
const dataDir = path.join(__dirname, "dev-data");

/* ================================
   READ TEMPLATES
================================ */
const templateOverview = fs.readFileSync(
  path.join(templatesDir, "template-overview.html"),
  "utf-8"
);

const templateCard = fs.readFileSync(
  path.join(templatesDir, "template-card.html"),
  "utf-8"
);

const templateProduct = fs.readFileSync(
  path.join(templatesDir, "template-product.html"),
  "utf-8"
);

/* ================================
   READ DATA
================================ */
const data = fs.readFileSync(path.join(dataDir, "data.json"), "utf-8");

const dataObj = JSON.parse(data);

/* ================================
   TEMPLATE REPLACER
================================ */
// const replaceTemplate = (template, product) => {
//   let output = template;

//   output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if (!product.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   } else {
//     output = output.replace(/{%NOT_ORGANIC%}/g, "");
//   }

//   return output;
// };

/* ================================
   CREATE SERVER
================================ */
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);
  //   const pathname = req.url;

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = dataObj
      .map((product) => replaceTemplate(templateCard, product))
      .join("");

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }

  // PRODUCT PAGE
  else if (pathname === "/product") {
    console.log("QUERY");
    console.log(query);
    res.writeHead(200, { "Content-Type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
    // res.end(templateProduct);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }

  // NOT FOUND
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "X-Custom-Header": "Node-App",
    });

    res.end("<h1>404 - Page not found</h1>");
  }
});

/* ================================
   START SERVER
================================ */
const PORT = 3000;
const HOST = "127.0.0.1";

server.listen(PORT, HOST, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});

// const http = require("http");
// const path = require("path");
// const fs = require("fs");

// const tempOverView = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   "utf-8"
// );

// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   "utf-8"
// );

// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   "utf-8"
// );

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);

// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.image);

//   output = output.replace(/{%FROM%}/g, product.image);

//   output = output.replace(/{%NUTRIENTS%}/g, product.image);

//   output = output.replace(/{%QUANTITY%}/g, product.image);

//   output = output.replace(/{%DESCRIPTION%}/g, product.image);
//   output = output.replace(/{%ID%}/g, product.image);

//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };

// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/" || pathName === "/overview") {
//     res.writeHead(200, { "Content-type": "text/html" });

//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(tempCard, el))
//       .join("");
//     console.log(cardsHtml);

//     const output = tempOverView.replace(`{%PRODUCT_CARDS%}`, cardsHtml);

//     res.end(output);
//     // res.end(tempOverView);
//   } else if (pathName === "/product") {
//     res.end("this is product");
//   } else if (pathName === "/api") {
//     res.writeHead(200, { "content-type": "application/json" });
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });

//     res.end("<h1>Page not found!.</h1>");
//   }
// });

// const PORT = 3000;

// const HOST = "127.0.0.1";

// server.listen(PORT, HOST, () => {
//   console.log(`server is listening on http://${HOST}:${PORT}`);
// });
