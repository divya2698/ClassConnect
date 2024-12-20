import * as teacherService from "./../services/teacher-service.js";
import { setResponse, setError } from "./index.js";

//Create controller
export const post = async (req, res) => {
    try {
        //Get request body
        const teacher = req.body;
        const savedTeacher = await teacherService.save(teacher);
        setResponse(savedTeacher, res);
    } catch (error) {
        setError(error, res);
    }
};

export const get = async (req, res) => {
    try {
        const teacher = await teacherService.getAll();
        setResponse(teacher, res);
    } catch (error) {
        setError(error, res);
    }
};

//login action
export const login = async (req, res) => {
    try {
        const teacher = await teacherService.login(req);
        setResponse(teacher, res);
    } catch (error) {
        setError(error, res);
    }
};

//Get specific student based on id
export const getSpecific = async (req, res) => {
    try {
        const teacher = await teacherService.getSpecific(req);
        setResponse(teacher, res);
    } catch (error) {
        setError(error, res);
    }
};

export const update = async (req,res) =>{
    try{
        console.log(req);
        const teacher = await teacherService.update(req);
        setResponse(teacher, res);
    }catch(error){
        setError(error, res);
    }
}