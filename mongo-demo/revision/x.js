// Course ,Author

// Using Refrences Normalization -> Consistency
// let author = {
//   name: "mosh",
// };

// let course = {
//   author: "id",
//   authors: ["id1", "id2"],
// };

// Using Embedded Documents (Denormalization) -> performance

let coursea = {
  author: {
    name: "mosh",
  },
};

// Hybrid

let author = {
  name: "Mosh",
  // 50 author properties
};

let course = {
  author: {
    id: "ref",
    name: "Mosh",
  },
};
