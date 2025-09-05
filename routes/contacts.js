const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

const router = express.Router();

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one contact by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


