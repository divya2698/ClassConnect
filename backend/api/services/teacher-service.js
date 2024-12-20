import Teacher from "../models/Teacher.js";
import jwt from "jsonwebtoken";

//create
export const save = (teacher) => {
    const teacherRecord = new Teacher(teacher);
    return teacherRecord.save();
};

//get
export const getAll = async () => {
    const teacherRecords = Teacher.find({}).exec();
    return teacherRecords;
};

//login - fetch user details, compare password and generate jwt token
export const login = async (req) => {
    try {
        let token = null;
        const teacher = await Teacher.findOne({ email: req.body.email });
        console.log("teacher", teacher);
        //check password
        const matched = req.body.password === teacher.password ? true : false;
        if (matched) {
            //generate jwt
            token = jwt.sign({ id: teacher._id }, process.env["JWT"]);
        }
        delete teacher.password;
        return { teacher: teacher, token: token };
    } catch (err) {
        throw err;
    }
};

//Get specific teacher by id
export const getSpecific = async (req) => {
    const _id = req.params.id;
    const teacher = await Teacher.findById(_id);
    return teacher;
};

//update
export const update = async (req) =>{
    const id = req.params.id;
    const updated = {... req.body};
    updated.id = id;
    const teacher = Teacher.findByIdAndUpdate(updated.id, updated).exec();
    return teacher;
}