const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playgroundrev")
  .then(() => console.log("Connecte to mongoDB..."))
  .catch((err) => console.log("Couldnot conecte to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Nana",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
}

// createCourse();

// async function getCourses() {
//   const courses = await Course.find();
//   console.log(courses);
// }

// getCourses();

// async function getCourses() {
//   const courses = await Course.find({ author: "Nana", isPublished: true });
//   console.log(courses);
// }

// getCourses();

// async function getCourses() {
//   const courses = await Course.find({
//     author: "Nana",
//     isPublished: true,
//   })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }

// getCourses();

// eq equal
// ne not equal
// gt greater than or equal to
// lt less than
// lte less than or equal to
// in
// nin not in

// Comparision operator

// async function getCourses() {
//   const courses = await Course
//     //   .find({ price: { $gte: 10, $lte: 20 } })
//     // .find({ price: { $in: [10, 15, 20] } })
//     .find({ author: "Nana", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });

//   console.log(courses);
// }

// getCourses();

// Logical Query OPerator
// or
// and

// async function getCourses() {
//   const courses = await Course.find()
//     .or([{ author: "Nana" }, { isPublished: true }])
//     // .and([{ author: "Nana" }, { isPublished: true }])
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });

//   console.log(courses);
// }

// getCourses();

// Regular expression

// async function getCourses() {
//   //   const courses = await Course.find({ author: /Nana/ });
//   //   const courses = await Course.find({ author: /^Nana/ }); //starts with
//   //   const courses = await Course.find({ author: /Nana$/i }); // Ends with
//   //   const courses = await Course.find({ author: /.*Nana.*/i }); // constains Nana
//   const courses = await Course.find({ author: /Nana/ })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });

//   console.log(courses);
// }

// getCourses();

// ounting the number ofDocuments

// async function getCourses() {
//   const courses = await Course.find({ author: "Nana", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .countDocuments();
//   console.log(courses);
// }

// getCourses();

// async function getCourses() {
//   const pageNumber = 1;
//   const pageSize = 10;
//   const courses = await Course.find({ author: "Nana", isPublished: true })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }

// getCourses();

// Updating a Document query

// Approach :Query First
// FindById()
// Modify its Properties
// Save()
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   course.isPublished = false;
//   course.author = "Aother Author";
//   course.set({
//     isPublished: false,
//     author: "Another Author",
//   });
//   const result = await course.save();
//   console.log(result);
// }

// updateCourse("692484ec90bf9494c4560161");

// Approach :Update First
// Update directly
// Optionally : get theupdated document

// async function updateCourse(id) {
//   const result = await Course.updateOne(
//     { _id: id },
//     {
//       $set: {
//         author: "Mosh",
//         isPublished: true,
//       },
//     }
//   );

//   console.log(result);
// }

// updateCourse("692484ec90bf9494c4560161");

// async function updateCourse(id) {
//   const course = await Course.findByIdAndUpdate(
//     id,
//     {
//       author: "Mosh",
//       isPublished: true,
//     },
//     { new: true } // returns updated document
//   );

//   console.log(course);
// }

// updateCourse("692484ec90bf9494c4560161");

// async function updateCourse(id) {
//   const course = await Course.findOneAndUpdate(
//     { _id: id },                   // filter
//     {                              // update
//       author: "Mosh",
//       isPublished: true,
//     },
//     {
//       new: true,                  // return updated document
//       runValidators: true,        // ensure schema validation
//     }
//   );

//   console.log(course);
// }

// updateCourse("692484ec90bf9494c4560161");
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

removeCourse("692484ec90bf9494c4560161");

async function removeCourseById(id) {
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}

removeCourseById("692484ec90bf9494c4560161");

async function removeCourseByFilter(id) {
  const course = await Course.findOneAndDelete({ _id: id });
  console.log(course);
}

removeCourseByFilter("692484ec90bf9494c4560161");

async function removeManyCourses() {
  const result = await Course.deleteMany({ isPublished: false });
  console.log(result);
}

removeManyCourses();
