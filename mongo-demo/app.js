const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Colud not to MongoDb", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Angular COurse",
    author: "Mosh",
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
