import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;