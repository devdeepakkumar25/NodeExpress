const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Colud not to MongoDb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Classes ,objects
//  Course ,nodeCourse

const Course = mongoose.model("Course", courseSchema);

// async function createCourse() {
//   const course = new Course({
//     name: "Node.js Course",
//     author: "Mosh",
//     tags: ["node", "backend"],
//     isPublished: true,
//   });

//   const result = await course.save();

//   console.log(result);
// }

// createCourse();

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

// createCourse();

// async function getCourses() {
//   //   const courses = await Course.find();
//   //   const courses = await Course.find({ author: "Mosh", isPublished: true });

//   const courses = await Course.find({
//     author: "Mosh",
//     isPublished: true,
//   })
//     .limit(10)
//     .sort({ name: 1 }) //ascending sort for descending use -1
//     .select({ name: 1, tags: 1 });

//   console.log(courses);
// }

// getCourses();

// Comparison Query Operator

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
//  nin (not in)
// async function getCourses() {
//   const courses = await Course
//     //   .find({ price: { $gte: 10, $lte: 20 } })
//     .find({ price: { $in: [10, 15, 20] } })
//     .limit(10)
//     .sort({ name: 1 }) //ascending sort for descending use -1
//     .select({ name: 1, tags: 1 });

//   console.log(courses);
// }

// getCourses();

// Logical Query Operator

// or
//  and

// async function getCourses() {
//   const courses = Course.find()
//     .or([{ author: "Mosh" }, { isPublished: true }])
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });

//   console.log(courses);
// }

// getCourses();

// Regular Expression

// async function getCourses() {
//   const courses = await Course
//     //   Starts with Mosh /pattern/ find({author:/pattern})

//     // .find({ author: /Mosh/ })
//     // .find({ author: /^Mosh/ })  //strats with ^
//     // .find({ author: /mosh$/i }) // Ends with $ i in the end indecating the case insensensative
//     // .find({ author: /.*Mosh.*/ }) // Contains Mosh
//     .find({ author: /.*mosh.*/i })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });

//   console.log(courses);
// }

// getCourses();

// Count documnets
// async function getCourses() {
//   const courses = await Course.find({ author: "Mosh", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .countDocuments();

//   console.log(courses);
// }

// getCourses();

// Pagination

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// getCourses();

// Approach :Query First
// findById()
// Modify its properties
// save()
// Approach :Update first
// Update directly
// Optionally: get the updated document

// Qyery approach
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";
  //   course.set({
  //     isPublished: true,
  //     author: "Another Author",
  //   });
  const result = await course.save();
  console.log(result);
}

// updateCourse("6921cd03ec7e66993d6823b4");

async function firstUpdateCourse(id) {
  // const course = await Course.update({isPublished:false})
  //   const result = await Course.updateOne(
  //     { _id: id },
  //     {
  //       $set: {
  //         author: "Mosh",
  //         isPublished: false,
  //       },
  //     }
  //   );

  //   console.log(result);

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(course);
}

// firstUpdateCourse("6921cd03ec7e66993d6823b4");

async function removeCourse(id) {
  //   const result = await Course.deleteOne({
  //     _id: id,
  //   });
  //   const result = await Course.deleteMany({ isPublished: true });
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
  //   console.log(result);
}

removeCourse("6921cd03ec7e66993d6823b4");
