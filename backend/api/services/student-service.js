import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

//create
export const save = (student) => {
    const studentRecord = new Student(student);
    return studentRecord.save();
};

//get
export const getAll = async () => {
    const studentRecords = Student.find({}).exec();
    return studentRecords;
};

//update
export const update = async (req) =>{
    const id = req.params.id;
    const updated = {... req.body};
    updated.id = id;
    const student = Student.findByIdAndUpdate(updated.id, updated).exec();
    return student;
}

//login - fetch user details, compare password and generate jwt token
export const login = async (req) => {
    try {
        let token = null;
        const student = await Student.findOne({ email: req.body.email });
        //check password
        const matched = req.body.password === student.password ? true : false;
        if (matched) {
            //generate jwt
            token = jwt.sign({ id: student._id }, process.env["JWT"]);
        }
        delete student.password;
        return { student: student, token: token };
    } catch (err) {
        throw err;
    }
};

export const getSpecific = async (req) => {
    const _id = req.params.id;
    const student = await Student.findById(_id);
    delete student.password;
    return student;
};
