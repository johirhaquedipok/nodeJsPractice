// create schema with the help of mongoose
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    /*     lowercase: true, //input will automatically converted to losercase
      uppercase: true, //input will automatically converted to uppercase
      trim: true, //if input data has any paddings(spaces) will be removed automatically */
  },
  author: String,
  tags: {
    type: Array,
    // custom validator for validating array
    vlidated: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have at least one tag",
    },
    /*  // async validation
         vlidated: {
        // async validation(when the validator is depended on data that is coming from another source)
        isAsync: true,
        validator: function (v, callback) {
          setTimeout(() => {
            const result = v && v.length > 0;
            callback(result);
          }, 0);
        },
        message: "A course should have at least one tag",
      },
      */
    minlength: 3, // minlength for string validation
    maxlength: 10, // maxlength for string validation
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 20 /* min and max is for validating number */,
    /* 
      set: (v) => Math.round(v) // setter method will be called when data is input
      get: (v) => Math.round(v) // getter method will be called when data is callig
      */
  },
  category: {
    type: String,
    // enum is for predefied field validation
    enum: ["web", "mobile", "network"],
  },
});

// mongoose model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Jo",
    tags: ["Angular", "Frontend"],
    isPublished: "true",
    price: 20,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (errors) {
    // this iteration is for showiyn any error happed in any filed
    for (err in err.errors) {
      console.log(err.errors[fields].message);
    }
  }
}

// createCourse();

// find data from the database

/* comparision operator
      *eq(equal)
      *ne(not equal)
      *gt(greater than)
      *gte(greater than or equal)
      *lt(less than)
      *lte(less than or equla)
      *in(less than or equla)
      *nin(not in)
  
    */

/* 
      or and and method query data from db
      *or 
      *and
      */

/* 
      pattern
  
      --- find anything that starts with the word.
      find({/^word/ })
  
      --- find anything that ends with the word.(case sensitive)
      find({/word$/ })
  
      --- find anything that ends with the word.(case insensitive)
      find({/word$/i })
  
      --- find any word that contains the word anywhere.(case sensitive)
      find({author: /.*word*./})
  
      --- find any word that contains the word anywhere.(case insensitive)
      find({author: /.*word*./i})
      */
/* count()
      return only number of documents that are matched with the queries
     */
/* 
    for pagination
    skip()
      limit()
    */

/* async function getCourse() {
    return await Course.find({
      isPublished: true,
      tags: { $in: ["frontend", "backend"] },
    })
      .sort({ price: -1 })
      .select({ name: 1, author: 1, price: 1 });
  } */
async function getCourse() {
  // using or operand
  return await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by*./i }])
    .sort("-price")
    .select({ name: 1, author: 1, price: 1 });
}

/* update a document */
async function updateCourse(id) {
  /* 
    // method 1
    const course = await Course.findById(id);
  
    if (!course) return;
    course.isPublished = true;
    course.author = "another author";
    // another appraoch to updat a in db
    // course.set({isPublished: true,author = 'another author' })
    const result = await course.save();
    console.log(result); */

  //method 2
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(result);
}

// updateCourse("62f54dde19890424a2c73b7b");

/* async function run() {
    const courses = await getCourse();
    console.log(courses);
  } */

// run();
