const categoryApi = {
  "/categories/": {
    get: {
      description: "get all categories information",
      tags: ["Category"],
      produces: ["application/json"],

      responses: {
        "200": {
          description: "get all categories success",
          schema: {
            type: "object",
            $ref: "#/definitions/foundCategories",
          },
        },
      },
    },
    post: {
      description: "create one category",
      tags: ["Category"],
      produces: ["application/json"],
      parameters: [
        {
          in: "header",
          name: "Authorization",
          schema: {
            type: "string",
          },
          required: true,
          description: "starting with `Bearer ` followed by the token value",
        },
        {
          in: "body",
          name: "req.body",
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                required: true,
                example: "PROFILE",
              },
              path: {
                type: "string",
                required: true,
                example: "/profile",
              },
              spot: {
                type: "string",
                required: true,
                example: "H",
              },
            },
          },
          required: true,
          description: "req.body object",
        },
      ],
      responses: {
        "201": {
          description: "create one category success",
          schema: {
            type: "object",
            $ref: "#/definitions/categoryInfo",
          },
        },
      },
    },
  },

  "/categories/{categoryId}": {
    patch: {
      description: "update one category information by categoryID",
      tags: ["Category"],
      produces: ["application/json"],
      parameters: [
        {
          in: "header",
          name: "Authorization",
          schema: {
            type: "string",
          },
          required: true,
          description: "starting with `Bearer ` followed by the token value",
        },
        {
          in: "path",
          name: "categoryId",
          schema: {
            type: "string",
          },
          required: true,
          description: "req.params categoryId",
        },
        {
          in: "body",
          name: "req.body",
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                required: false,
                example: "PROFILE",
              },
              path: {
                type: "string",
                required: false,
                example: "/profile",
              },
            },
          },
          required: true,
          description: "req.body object",
        },
      ],
      responses: {
        "201": {
          description: "update one category information success",
          schema: {
            type: "object",
            $ref: "#/definitions/categoryInfo",
          },
        },
      },
    },
    delete: {
      description: "delete one category information by categoryID",
      tags: ["Category"],
      produces: ["application/json"],
      parameters: [
        {
          in: "header",
          name: "Authorization",
          schema: {
            type: "string",
          },
          required: true,
          description: "starting with `Bearer ` followed by the token value",
        },
        {
          in: "path",
          name: "categoryId",
          schema: {
            type: "string",
          },
          required: true,
          description: "req.params categoryId",
        },
      ],
      responses: {
        "201": {
          description: "delete one category information success",
          schema: {
            type: "object",
            $ref: "#/definitions/categoryInfo",
          },
        },
      },
    },
  },
};

export default categoryApi;
