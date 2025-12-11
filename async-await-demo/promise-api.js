const p = Promise.resolve({ id: 1 });

p.then((result) => console.log(result));

const r = Promise.reject(new Error("reason for rejection...."));

r.catch((err) => console.log(err.message));

// parallel Promises
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Operation 2...");
    resolve(2);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 3...");
    reject(new Error("Because something failed..."));
  }, 2000);
});
Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));

Promise.all([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));




  