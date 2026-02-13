import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
  name: String,
  email: String,
  issue: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Support", supportSchema);