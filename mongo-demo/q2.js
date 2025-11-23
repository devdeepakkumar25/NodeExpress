// get all the published frontend and backend courses,
// sort them by their price in a descending ondragover,
// pick only their name author,
// and display them.

const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongo-exercises");
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("Could not connect to MongoDB...", err);
  }
}

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

// async function getCourses() {
//   const courses = await Course.find({
//     isPublished: true,
//     tags: { $in: ["frontend", "backend"] },
//   })
//     .sort({ price: -1 }) //sort('-price')
//     .select("name author price");

//   return courses;
// }

async function getCourses() {
  const courses = await Course.find({
    isPublished: true,
  })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 }) //sort('-price')
    .select("name author price");

  return courses;
}

async function run() {
  await connect();
  const courses = await getCourses();
  console.log(courses);
}

run();
