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
  const pageNumber = 2;
  const pageSize = 10;

  const course = await Course.find({ author: "Ben", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(course);
}

async function updateCourse(id) {
  //Approach: Query first
  //findById()
  //Modify its properties
  //save()
  const course = await Course.findById(id);
  if (!course) return;
  course.set({
    name: "Sapiens",
    tags: [
      "Cognitive revolution",
      "Agricultural revolution",
      "Scientific revolution",
    ],
    isPublished: true,
    author: "Yuval Noah",
  });
  const result = await course.save();
  console.log(result);
}

updateCourse("634191f9e9195877f4ce1bf9");