// server.js
const express = require("express");
const { connectToDb } = require("./db/connection");
const contactsRoutes = require("./routes/contacts");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Contacts API is running");
});

// Contacts routes
app.use("/contacts", contactsRoutes);

// Swagger API docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB and start server
connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));









