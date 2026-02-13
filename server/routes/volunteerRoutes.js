import express from "express";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

// POST volunteer registration
router.post("/", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    const saved = await newVolunteer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;