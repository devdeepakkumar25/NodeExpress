import path from "path";
import { fileURLToPath } from "url";

// ESM replacements
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Filename:", __filename);
console.log("Dirname:", __dirname);

// Parse path
const info = path.parse(__filename);
console.log(info);

// Useful path methods
console.log("Base:", path.basename(__filename));
console.log("Extension:", path.extname(__filename));
console.log("Join:", path.join(__dirname, "public", "index.html"));
console.log("Resolve:", path.resolve("app.js"));

// 1️⃣ path.basename()

// Returns the file name.

console.log(path.basename(__filename));

// 2️⃣ path.dirname()

// Returns the directory name.

console.log(path.dirname(__filename));


// 3️⃣ path.extname()

// Returns the file extension.
console.log(path.extname(__filename));


// path.join()

// Joins path segments safely.

console.log(path.join(__dirname, "public", "images", "logo.png"));


// path.resolve()

// Returns an absolute path.
console.log(path.resolve("app.js"));


// 6️⃣ path.parse()

// Returns an object describing the file path.

console.log(path.parse(__filename));

// path.format()

// Converts a parsed object back into a path.
const obj = path.parse(__filename);
console.log(path.format(obj));
