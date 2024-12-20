import Course from "./../models/coursemodel.js";
import Record from "./../models/recordmodel.js";
import Student from "./../models/Student.js"

//Create new course
export const newCourse = async (req, res) => {
  const course = new Course(req.body);
  try {
    await course.save();
    res.send({ data: course, success: true });
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      res.send({ success: false, reason: "Code already exists" });
    res.status(400).send(error);
  }
};

// Fetch course by ID
export const courseByID = async (req, res) => {
  const _id = req.params.id;

  try {
    const course = await Course.findById(_id);
    if (!course)
      return res.status(404).send({ success: false, data: "No courses found" });

    res.send({ success: true, data: course });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

//Fetch all courses for a teacher
export const courseByTeacher = async (req, res) => {
  const _id = req.params.id;

  try {
    const courses = await Course.find({ teacher_id: _id });
    if (!courses)
      return res.status(404).send({ success: false, data: "No courses found" });

    res.send({ success: true, data: courses });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// Enroll student in a course
export const enrollStudent = async (req, res) => {
  const record = new Record(req.body);
  try {
    await record.save();
    res.send({ data: record, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, error });
  }
};

// Fetch all courses for a student
export const allCourses = async (req, res) => {
  const _id = req.params.id;
  const courses = [];
  try {
    const records = await Record.find({ student_id: _id });
    for (const record of records) {
      const course = await Course.findById(record.course_id);
      courses.push(course);
    }
    if (courses.length) res.send({ success: true, data: courses });
    else res.send({ success: false });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// Get count of students in a course
export const studentCount = async (req, res) => {
  const _id = req.params.id;

  try {
    const count = await Record.where({ course_id: _id }).countDocuments();
    res.send({ success: true, data: { count } });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// Get all students in a course
export const allStudentsInCourse = async (req, res) => {
  const _id = req.params.id;
  const students = [];
  try {
    const records = await Record.find({ course_id: _id });
    for (const record of records) {
      const student = await Student.findById(record.student_id);
      students.push(student);
    }
    res.send({ success: true, data: students });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

// Check if a course code is valid
export const validCourseCheck = async (req, res) => {
  const course = await Course.findOne({ course_code: req.body.course_code });
  try {
    if (course) res.send({ data: course, success: true });
    else res.send({ success: false, data: "Invalid course code" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, error });
  }
};

// Create record of which student is enrolled in which course
export const createRecord = async (req, res) => {
  const record = new Record(req.body);
  try {
    await record.save();
    res.send({ data: record, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//requires student model
// // Find students in a course
// export const findStudentsInCourse = async (req, res) => {
//   const _id = req.params.id;
//     const fName = req.body.fName;
//     const lName = req.body.lName;
//     const students = [];
//     try {
//         const records = await Record.find({ course_id : _id});
//         for (const record of records) {
//             const student = await Student.findById(record.student_id);
//             if(fName && lName)
//             {
//                 if(student.fName.toLowerCase() == fName.toLowerCase() && student.lName.toLowerCase() == lName.toLowerCase())
//                     students.push(student);
//             } else if(!fName)
//             {
//                 if(student.lName.toLowerCase() == lName.toLowerCase())
//                     students.push(student);
//             } else if(!lName)
//             {
//                 if(student.fName.toLowerCase() == fName.toLowerCase())
//                     students.push(student);
//             }
//         }
//         res.send({success: true, data: students});
//     } catch(error) {
//         res.status(500).send({success: false, error});
//     }
// };

// Remove student from a course
export const removeStudentFromCourse = async (req, res) => {
  const course_id = req.body.course_id;
  const student_id = req.body.student_id;

  try {
    const record = await Record.findOneAndDelete({ course_id, student_id });
    if (record) res.send({ success: true, data: record });
    else res.send({ success: false });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findByIdAndDelete(_id);
    if (course) res.send({ success: true, data: course });
    else res.send({ success: false });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

// Update course name
export const updateCourse = async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findById({ _id });
    course.name = req.body.name;
    await course.save();
    res.send({ data: course, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
