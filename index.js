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
const course = new Course({
  name: "Spring boot course",
  author: "Ben",
  tags: ["Spring", "Boot"],
  isPublished: true,
});