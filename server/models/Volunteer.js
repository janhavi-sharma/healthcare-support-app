import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: String,
  availability: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Volunteer", volunteerSchema);