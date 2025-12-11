const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playgroundrev")
  .then(() => console.log("Connecte to mongoDB..."))
  .catch((err) => console.log("Couldnot conecte to MongoDB...", err));

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
    lowercase: true,
    // uppercase:true,
    trim: true,
  },
  author: String,
  //   tags: {
  //     type: Array,
  //     validate: {
  //       validator: function (v) {
  //         return v && v.length > 0;
  //       },
  //     },
  //     message: "A course should have at least one tag.",
  //   },
  //   tags: {
  //     type: Array,
  //     validate: {
  //       validator: function (v) {
  //         return new Promise((resolve) => {
  //           setTimeout(() => {
  //             resolve(v && v.length > 0);
  //           }, 4000);
  //         });
  //       },
  //       message: "A course should have at least one tag.",
  //     },
  //   },
  tags: {
    type: Array,
    validate: {
      validator: async function (v) {
        await new Promise((r) => setTimeout(r, 4000));
        return v && v.length > 0;
      },
      message: "A course should have at least one tag.",
    },
  },

  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

// courseSchema.set("toJSON", { getters: true });
courseSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

courseSchema.set("toObject", {
  getters: true,
  virtuals: true,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "Web",
    author: "Nana",
    tags: ["fronted"],
    // tags: ["angular", "frontend"],
    isPublished: true,
    price: 15,
  });
  try {
    await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // console.log(ex.message);
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

// createCourse();

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

getCourses();
