import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    user_id: { type: String, required: true},
    user_type: { type: String, required: true },
    content: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Note", Schema);

export default model;