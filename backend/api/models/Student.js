import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: "Please enter the firstname",
            trim: true,
        },
        lastname: {
            type: String,
            required: "Please enter the lastname",
            trim: true,
        },
        email: {
            type: String,
            required: "Please enter the email",
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        password: {
            type: String,
            required: "Enter the password",
            minlength: 5,
        },
        department: { type: String, required: "Department is required" },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//Create a mongoose model with the schema in students collection
const model = mongoose.model("student", schema);

export default model;
