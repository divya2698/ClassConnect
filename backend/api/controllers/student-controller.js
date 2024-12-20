import * as studentService from "./../services/student-service.js";
import { setResponse, setError } from "./index.js";

//Create controller
export const post = async (req, res) => {
    try {
        //Get request body
        const student = req.body;
        const savedStudent = await studentService.save(student);
        setResponse(savedStudent, res);
    } catch (error) {
        setError(error, res);
    }
};

export const get = async (req, res) => {
    try {
        const students = await studentService.getAll();
        setResponse(students, res);
    } catch (error) {
        setError(error, res);
    }
};

export const update = async (req,res) =>{
    try{
        console.log(req);
        const students = await studentService.update(req);
        setResponse(students, res);
    }catch(error){
        setError(error, res);
    }
}

//login action
export const login = async (req, res) => {
    try {
        const student = await studentService.login(req);
        setResponse(student, res);
    } catch (error) {
        setError(error, res);
    }
};

//Get specific student based on id
export const getSpecific = async (req, res) => {
    try {
        const student = await studentService.getSpecific(req);
        setResponse(student, res);
    } catch (error) {
        setError(error, res);
    }
};
