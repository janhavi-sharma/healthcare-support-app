import express from "express";
import Support from "../models/Support.js";

const router = express.Router();

// POST support request
router.post("/", async (req, res) => {
  try {
    const newSupport = new Support(req.body);
    const saved = await newSupport.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all support requests
router.get("/", async (req, res) => {
  try {
    const supports = await Support.find();
    res.json(supports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;