const userApi = {
  paths: {
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
            description: "get one user information success",
            schema: {
              type: "object",
              $ref: "#/definitions/userInfo",
            },
          },
        },
      },
    },

    "/users/signup": {
      post: {
        description: "sign up user",
        tags: ["User"],
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
                },
                password: {
                  type: "string",
                  required: true,
                },
                profileImg: {
                  type: "string",
                  required: false,
                },
                introduction: {
                  type: "string",
                  required: true,
                },
              },
            },
            required: true,
            description: "req.body object",
          },
        ],
        responses: {
          "201": {
            description: "create(signup) one user success",
            schema: {
              type: "object",
              $ref: "#/definitions/userInfo",
            },
          },
        },
      },
    },

    "/users/login": {
      post: {
        description: "login user",
        tags: ["User"],
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
                },
                password: {
                  type: "string",
                  required: true,
                },
              },
            },
            required: true,
            description: "req.body object",
          },
        ],
        responses: {
          "200": {
            description: "login success",
            schema: {
              type: "object",
              $ref: "#/definitions/accessToken",
            },
          },
        },
      },
    },

    "/users/logout": {
      post: {
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
            description: "logout one user success",
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
                },
                password: {
                  type: "string",
                  required: false,
                },
                profileImg: {
                  type: "string",
                  required: false,
                },
                introduction: {
                  type: "string",
                  required: false,
                },
              },
            },
            required: true,
            description: "req.body object",
          },
        ],
        responses: {
          "201": {
            description: "update one user information success",
            schema: {
              type: "object",
              $ref: "#/definitions/userInfo",
            },
          },
        },
      },
      delete: {
        description: "remove one user by userID",
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
            description: "remove one user information success",
            schema: {
              type: "object",
              $ref: "#/definitions/userInfo",
            },
          },
        },
      },
    },
  },

  definitions: {
    userInfo: {
      properties: {
        id: {
          type: "string",
        },
        nickname: {
          type: "string",
        },
        profileImg: {
          type: "string",
        },
        role: {
          type: "string",
        },
        introduction: {
          type: "string",
        },
        createdAt: {
          type: "date",
        },
        updatedAt: {
          type: "date",
        },
      },
    },
    accessToken: {
      properties: {
        accessToken: {
          type: "string",
        },
      },
    },
  },
  responses: {},
  parameters: {
    userId: {
      name: "userId",
      description: "req.params userId",
      in: "params",
      required: true,
      type: "string",
    },
    password: {
      name: "password",
      description: "password to use for signup.",
      in: "Body",
      required: true,
      type: "string",
    },
    profileImg: {
      name: "profileImg",
      description: "profileImg to use for signup.",
      in: "Body",
      required: false,
      type: "string",
    },
    introduction: {
      name: "introduction",
      description: "introduction to use for signup.",
      in: "Body",
      required: true,
      type: "string",
    },
  },
};

export default userApi;
