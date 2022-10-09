const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

  const courseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      //match: /pattern/
    },
    author: String,
    category: {
      type: String,
      required: true,
      enum: ["web", "mobile", "network"],
      lowercase: true,
      //toUppercase: true,
      trim: true,
    },
    tags: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "A course should have atleast one tag.",
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

  const Course = mongoose.model("Course", courseSchema);

  async function createCourse() {
    const course = new Course({
      name: "Android course",
      author: "Tim",
      category: "MOBILE",
      tags: ["frontend"],
      isPublished: false,
      price: 50.83,
    });

    try {
      //await course.validate(); //this returns a void promise
      /**
       * The only way to make return, is by using a callback function as shown below
       * course.validate((err) => {
          if(err) {}
       * })
       */
      const result = await course.save();
      console.log(result);
    } catch (err) {
      for (field in err.errors) console.log(err.errors[field].message);
    }
  }

  // createCourse();

  async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const course = await Course.find({ _id: "634304da0e358ce9fa99269b" })
      //.skip((pageNumber - 1) * pageSize)
      //.limit(pageSize)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1, price: 1 });
    console.log(course[0].price);
  }

  getCourses();

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
