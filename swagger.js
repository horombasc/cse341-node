const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Contacts API",
    version: "1.0.0",
    description: "API to manage contacts",
  },
  servers: [
    { url: "https://cse341-node-287t.onrender.com" } 
  ],
  paths: {
    "/contacts": {
      get: {
        summary: "Get all contacts",
        responses: {
          "200": {
            description: "List of contacts",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      name: { type: "string" },
                      surname: { type: "string" },
                      email: { type: "string" },
                      favoriteColor: { type: "string" },
                      birthday: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Create a new contact",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "surname", "email", "favoriteColor", "birthday"],
                properties: {
                  name: { type: "string" },
                  surname: { type: "string" },
                  email: { type: "string" },
                  favoriteColor: { type: "string" },
                  birthday: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "201": { description: "Contact created" } }
      }
    },
    "/contacts/{id}": {
      get: {
        summary: "Get contact by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Contact found" },
          "404": { description: "Contact not found" }
        }
      },
      put: {
        summary: "Update contact by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "surname", "email", "favoriteColor", "birthday"],
                properties: {
                  name: { type: "string" },
                  surname: { type: "string" },
                  email: { type: "string" },
                  favoriteColor: { type: "string" },
                  birthday: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Contact updated" },
          "404": { description: "Contact not found" }
        }
      },
      delete: {
        summary: "Delete contact by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Contact deleted" },
          "404": { description: "Contact not found" }
        }
      }
    }
  }
};

module.exports = { swaggerUi, swaggerDocument };






