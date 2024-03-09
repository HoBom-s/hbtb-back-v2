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
              profileImg: {
                type: "string",
                required: false,
                example:
                  "https://hobom.s3.ap-northeast-2.amazonaws.com/samho.jpg",
              },
              introduction: {
                type: "string",
                required: true,
                example: "More Churu",
              },
            },
          },
          required: true,
          description: "req.body object",
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
          in: "body",
          name: "req.body",
          schema: {
            type: "object",
            properties: {
              nickname: {
                type: "string",
                required: false,
                example: "Laphoo",
              },
              password: {
                type: "string",
                required: false,
                example: "TreatLove119",
              },
              profileImg: {
                type: "string",
                required: false,
                example:
                  "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
              },
              introduction: {
                type: "string",
                required: false,
                example: "Trick or Treat!",
              },
            },
          },
          required: true,
          description: "req.body object",
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
