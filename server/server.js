import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Needed for ES modules (__dirname fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import supportRoutes from "./routes/supportRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

app.use("/api/support", supportRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/contact", contactRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Catch-all route
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));