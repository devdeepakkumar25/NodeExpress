// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY

let author = {
  name: "Mosh Hamedani",
};

let course = {
  author: "id",
};

// Using Embedded Documents (Denormalization) -> PERFORMANCE

let course1 = {
  author: {
    name: "Mosh",
  },
};

// Hybrid
let authorA = {
  name: "Mosh",
  // 50 other properties
};

let courseA = {
  author: {
    id: "ref",
    name: "Mosh",
  },
};
