const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Colud not to MongoDb", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    //match:/pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "web",
    author: "Mosh",
    tags: [],
    isPublished: true,
    price: 15,
  });
  try {
    await course.validate();
    // const result = await course.save();
    // console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

createCourse();

// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:/playground")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Colud not to MongoDb", err));

// const courseSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 255,
//     //match:/pattern/
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: ["web", "mobile", "network"],
//     lowercase: true,
//     // uppercase: true,
//     trim: true,
//   },
//   author: String,
//   tags: {
//     type: Array,
//     validate: {
//       validator: function (v) {
//         return new Promise((resolve) => {
//           setTimeout(() => {
//             const result = v && v.length > 0;
//             resolve(result); // resolve true/false
//           }, 4000);
//         });
//       },
//       message: "A course should have at least one tag",
//     },
//   },
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
//   price: {
//     type: Number,
//     required: function () {
//       return this.isPublished;
//     },
//     min: 10,
//     max: 200,
//     get: (v) => Math.round(v),
//     set: (v) => Math.round(v),
//   },
// });

// courseSchema.set("toJSON", { getters: true });
// courseSchema.set("toObject", { getters: true });

// const Course = mongoose.model("Course", courseSchema);

// async function createCourse() {
//   const course = new Course({
//     name: "Angular Course",
//     category: "WEb",
//     author: "Mosh",
//     tags: ["frontend"],
//     isPublished: true,
//     price: 15.8,
//   });
//   try {
//     await course.validate();
//     const result = await course.save();
//     console.log(result);
//   } catch (ex) {
//     // console.log(ex.message);
//     for (field in ex.errors) {
//       // console.log(ex.errors[field]);
//       console.log(ex.errors[field].message);
//     }
//   }
// }

// // createCourse();

// async function getCourses() {
//   const courses = await Course.find({ _id: "6922b3a1dbd4d25eade28ad6" });
//   console.log(courses);
// }

// getCourses();
