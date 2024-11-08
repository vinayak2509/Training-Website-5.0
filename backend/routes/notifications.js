const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();

router.get("/contact", async (req, res) => {
  try {
    const existingData = await Contact.find();
    res.status(200).json(existingData);
  } catch (err) {
    console.error("Error fetching contact data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
