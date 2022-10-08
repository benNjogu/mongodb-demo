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
  /**
   * or
   * and
   */
  const course = await Course
    //.find({ author: "Ben", isPublished: true })
    .find()
    .or({ author: "Ben" }, { isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(course);
}

getCourses();