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

// POST create new contact
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const { name, surname, email, favoriteColor, birthday } = req.body;

    if (!name || !surname || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await db.collection("contacts").insertOne({
      name,
      surname,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update a contact by ID
router.put("/:id", async (req, res) => {
  try {
    const db = getDb();
    const { name, surname, email, favoriteColor, birthday } = req.body;

    const result = await db.collection("contacts").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, surname, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: "Contact not found" });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: "Contact not found" });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;




