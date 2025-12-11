const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playgroundrev2")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("couldnot connet to mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse1() {
  const course = new Course({
    name: "Node.js Course",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

// createCourse1();

async function createCourse2() {
  const course = new Course({
    name: "Angular.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

// createCourse2();

// Quereying Documents

async function getCourses1() {
  const courses = await Course.find();
  console.log(courses);
}

// getCourses1();

async function getCourses2() {
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// getCourses2();

async function getCourses3() {
  // eq  (equal)
  // ne (not equal)
  // gt (greater than)
  // gte greater than or equal to
  // lt less than
  // lte less than or equal to
  // in
  //  nin not in
  //   const courses = await Course.find({ price: { $gt: 10 } })
  //   const courses = await Course.find({ price: { $gte: 10, $lte: 20 } })
  const courses = await Course.find({ price: { $in: [10, 15, 20] } })
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// getCourses3();

// Logical query
async function getCourses4() {
  const courses = await Course.find()
    .or([{ author: "Mosh" }, { isPublished: true }])
    .and({})
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// getCourses4();

// Regular Expression
async function getCourses5() {
  // ?start with
  //   const courses = await Course.find({ author: /^Mosh/i })
  // Ends with - case insenstaive
  //   const courses = await Course.find({ author: /^Mosh$/i })
  const courses = await Course.find({ author: /.*Mosh.*/gi })
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses5();

async function getCourses6() {
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .countDocuments();
  console.log(courses);
}

// getCourses6();

async function updateDocument(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Another Author";

  course.set({
    isPublished: false,
    author: "Another Author",
  });
  const result = await course.save();
  console.log(result);
}

updateDocument("693b046a80af6c060c0412b7");

async function removeCourse(id) {
  //   const result = await Course.deleteOne({ _id: id });
  //   console.log(result);
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}

removeCourse("693b046a80af6c060c0412b7");
