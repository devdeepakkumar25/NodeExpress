const { error } = require("console");
const fs = require("fs");
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");

/* ================================
   PROMISIFIED READ FILE
================================ */
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        reject("❌ I could not find that file");
        return;
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("sucess");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);

    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join("\n"));

    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image save to file");
  } catch (err) {
    console.log(res.body.message);
    throw err;
  }

  return "2: Ready";
};

// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`Breed: ${data}`);

//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );

//     console.log(res.body.message);

//     await writeFilePro("dog-img.txt", res.body.message);
//     console.log("Random dog image save to file");
//   } catch (err) {
//     console.log(res.body.message);
//     throw err;
//   }

//   return "2: Ready";
// };

// console.log("1: will get dog pics!");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: Done getting the dog pics");
//   })
//   .catch((err) => console.log(err.message));

// console.log("2: Done getting dog pics");

(async () => {
  try {
    console.log("1 Will get doc pics");
    const x = await getDogPic();
    console.log("Printing hte value of x");
    console.log(x);
    console.log("3: Done getting thi dog pics");
  } catch (err) {
    console.log(err.message);
  }
})();
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     const breed = data.trim();
//     console.log(`Breed: ${breed}`);

//     return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
//   })
//   .then((res) => {
//     console.log("Image URL:", res.body.message);

//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then((msg) => {
//     console.log(msg);
//     console.log("Random dog image saved to file");
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });

// const fs = require("fs");
// const superagent = require("superagent");
// const { reject } = require("superagent/lib/request-base");

// /* ================================
//    PROMISIFIED READ FILE
// ================================ */
// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, "utf-8", (err, data) => {
//       if (err) {
//         reject("❌ I could not find that file");
//         return;
//       }
//       resolve(data);
//     });
//   });
// };

// /* ================================
//    PROMISE CHAIN
// ================================ */
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     const breed = data.trim();
//     console.log(`Breed: ${breed}`);

//     return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
//   })
//   .then((res) => {
//     console.log("Image URL:", res.body.message);

//     return new Promise((resolve, reject) => {
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) reject(" Could not write file");
//         else resolve("Random dog image saved to file");
//       });
//     });
//   })
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });

// const fs = require("fs");
// const superagent = require("superagent");

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err.message);
//     return;
//   }

//   const breed = data.trim();
//   console.log(`Breed: ${breed}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${breed}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, () => {
//         console.log("Random dog image saved to file");
//       });
//     })
//     .catch((err) => {
//       console.error("Error fetching API:", err.message);
//     });
// });

// const fs = require("fs");
// const superagent = require("superagent");

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err.message);
//     return;
//   }

//   const breed = data.trim();
//   console.log(`Breed: ${breed}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${breed}/images/random`)
//     .end((err, res) => {
//       if (err) {
//         console.error("Error fetching API:", err.message);
//         return;
//       }

//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, () => {
//         console.log("Random dog image saved to file");
//       });
//     });
// });
