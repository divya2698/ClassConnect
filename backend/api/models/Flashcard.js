import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: "Please enter the question",
        },
        answer: {
            type: String,
            required: "Please enter the answer",
        },
        option1: {
            type: String,
            required: "Please enter the option1",
        },
        option2: {
            type: String,
            required: "Please enter the option2",
        },
        option3: {
            type: String,
            required: "Please enter the option3",
        },
        option4: {
            type: String,
            required: "Please enter the option4",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//Create a mongoose model with the schema in students collection
const model = mongoose.model("flashcard", schema);

export default model;
