const express = require("express");
const { connectToDb } = require("./db/connection");
const contactsRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 3000;

app.use("/contacts", contactsRoutes);

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));






