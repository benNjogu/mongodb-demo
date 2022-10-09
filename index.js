const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

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
    name: "ReactNative course",
    author: "Ben",
    tags: ["React", "Native"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const course = await Course.find({ author: "Ben", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(course);
}

getCourses();