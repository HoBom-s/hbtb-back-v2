const userPath = {
  "/users/": {
    get: {
      description: "get one user information by userID",
      tags: ["User"],
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
      ],
      responses: {
        "200": {
          description: "`data` get one user information success",
          schema: {
            type: "object",
            $ref: "#/definitions/foundUser",
          },
        },
      },
    },
  },

  "/users/signup": {
    post: {
      description: "sign up user",
      tags: ["User"],
      consumes: ["multipart/form-data"],
      produces: ["application/json"],
      parameters: [
        {
          in: "formData",
          name: "nickname",
          type: "string",
          required: true,
          description: "nickname for signup",
        },
        {
          in: "formData",
          name: "password",
          type: "string",
          required: true,
          description: "password for signup",
        },
        {
          in: "formData",
          name: "profileImg",
          type: "file",
          required: true,
          description: "profile image for signup",
        },
        {
          in: "formData",
          name: "introduction",
          type: "string",
          required: true,
          description: "introduction for signup",
        },
      ],
      responses: {
        "201": {
          description: "`data` create(signup) one user success",
          schema: {
            type: "object",
            $ref: "#/definitions/createdUser",
          },
        },
      },
    },
  },

  "/users/login": {
    post: {
      description: "login user",
      tags: ["User"],
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "req.body",
          schema: {
            type: "object",
            properties: {
              nickname: {
                type: "string",
                required: true,
                example: "Samho",
              },
              password: {
                type: "string",
                required: true,
                example: "Churu20000kum",
              },
            },
          },
          required: true,
          description: "req.body object",
        },
      ],
      responses: {
        "200": {
          description: "`data` login success",
          schema: {
            type: "object",
            $ref: "#/definitions/accessToken",
          },
        },
      },
    },
  },

  "/users/logout": {
    get: {
      description: "logout one user",
      tags: ["User"],
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
      ],
      responses: {
        "201": {
          description: "`data` logout one user success",
          schema: {
            type: "string",
          },
        },
      },
    },
  },

  "/users/{userId}": {
    patch: {
      description: "update one user information by userID",
      tags: ["User"],
      consumes: ["application/json"],
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
          name: "userId",
          schema: {
            type: "string",
          },
          required: true,
          description: "req.params userId",
        },
        {
          in: "formData",
          name: "nickname",
          type: "string",
          required: false,
          description: "nickname for the signup",
        },
        {
          in: "formData",
          name: "nickname",
          type: "string",
          required: false,
          description: "nickname for signup",
        },
        {
          in: "formData",
          name: "password",
          type: "string",
          required: false,
          description: "password for signup",
        },
        {
          in: "formData",
          name: "profileImg",
          type: "file",
          required: false,
          description: "profile image for signup",
        },
        {
          in: "formData",
          name: "introduction",
          type: "string",
          required: false,
          description: "introduction for signup",
        },
      ],
      responses: {
        "201": {
          description: "`data` update one user information success",
          schema: {
            type: "object",
            $ref: "#/definitions/updatedUser",
          },
        },
      },
    },

    delete: {
      description: "delete one user by userID",
      tags: ["User"],
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
          name: "userId",
          schema: {
            type: "string",
          },
          required: true,
          description: "req.params userId",
        },
      ],
      responses: {
        "201": {
          description: "delete one user information success",
          schema: {
            type: "string",
            example: "Delete user success.",
          },
        },
      },
    },
  },
};

export default userPath;
