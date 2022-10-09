const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

  const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
  });

  const Course = mongoose.model("Course", courseSchema);

  async function createCourse() {
    const course = new Course({
      // name: "ReactNative course",
      author: "Ben",
      tags: ["React", "Native"],
      isPublished: true,
    });

    try {
      await course.validate(); //this returns a void promise
      /**
       * The only way to make return, is by using a callback function as shown below
       * course.validate((err) => {
          if(err) {}
       * })
       */
      //const result = await course.save();
      //console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  createCourse();

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
  //Approach: Update first
  //Upate directly
  //Optionally: get the updated document
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Yuval Noah Harari",
        isPublished: true,
      },
    },
    { new: true }
  );

  console.log(result);
}

async function removeCourse(id) {
  //const result = await Course.deleteOne({ _id: id });
  const course = await Course.findOneAndRemove(id);
  console.log(course);
}
