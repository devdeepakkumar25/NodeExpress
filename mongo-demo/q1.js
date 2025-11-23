// Get all the published backedn courses,
// sort them by their name,
// Pick only their name and author
// and display them

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: "backend",
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 }); // sorting using name in sscending order for descneding use "-name"

  //   }).sort("name"); // sorting using name in sscending order for descneding use "-name"
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();

// const mongoose = require("mongoose");

// async function connect() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/mongo-exercises");
//     console.log("Connected to MongoDB...");
//   } catch (err) {
//     console.error("Could not connect to MongoDB...", err);
//   }
// }

// const courseSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   tags: [String],
//   date: Date,
//   isPublished: Boolean,
//   price: Number,
// });

// const Course = mongoose.model("Course", courseSchema);

// async function getCourses() {
//   const courses = await Course.find({ isPublished: true, tags: "backend" })
//     .sort({ name: 1 })
//     .select("name author");

//   return courses;
// }

// async function run() {
//   await connect();
//   const courses = await getCourses();
//   console.log(courses);
// }

// run();
