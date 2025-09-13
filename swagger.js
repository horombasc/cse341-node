// swagger.js
module.exports = {
  openapi: "3.0.3",
  info: {
    title: "Contacts API",
    version: "1.0.0",
    description: "API for managing contacts",
  },
  servers: [
    {
      url: "https://cse341-contacts.onrender.com", // use your Render URL after deployment
    },
  ],
  paths: {
    "/contacts": {
      get: {
        summary: "Get all contacts",
        responses: {
          200: {
            description: "List of all contacts",
          },
        },
      },
      post: {
        summary: "Create a new contact",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  surname: { type: "string" },
                  email: { type: "string" },
                  favoriteColor: { type: "string" },
                  birthday: { type: "string" },
                },
                required: ["name", "surname", "email", "favoriteColor", "birthday"],
              },
            },
          },
        },
        responses: {
          201: { description: "Contact created" },
          400: { description: "Missing fields" },
        },
      },
    },
    "/contacts/{id}": {
      get: {
        summary: "Get a contact by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Contact found" },
          404: { description: "Contact not found" },
        },
      },
      put: {
        summary: "Update a contact by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  surname: { type: "string" },
                  email: { type: "string" },
                  favoriteColor: { type: "string" },
                  birthday: { type: "string" },
                },
                required: ["name", "surname", "email", "favoriteColor", "birthday"],
              },
            },
          },
        },
        responses: {
          204: { description: "Contact updated" },
          404: { description: "Contact not found" },
        },
      },
      delete: {
        summary: "Delete a contact by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          204: { description: "Contact deleted" },
          404: { description: "Contact not found" },
        },
      },
    },
  },
};

