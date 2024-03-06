const userApi = {
  paths: {
    "/users/": {
      get: {
        description: "Get one user information by userID",
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
            description: "Starting with `Bearer ` followed by the token value",
          },
        ],
        responses: {
          "200": {
            description: "Get one user information success",
            schema: {
              type: "object",
              $ref: "#/definitions/GetOneUserByUserID",
            },
          },
        },
      },
    },

    "/users/signup": {
      post: {
        description: "Sign up user",
        tags: ["User"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
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
            description: "example object",
          },
        ],
        responses: {
          "201": {
            description: "Create(signup) one user success",
            schema: {
              type: "object",
              $ref: "#/definitions/GetOneUserByUserID",
            },
          },
        },
      },
    },
  },
  definitions: {
    GetOneUserByUserID: {
      required: ["userID"],
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
          type: "datetime",
        },
        updatedAt: {
          type: "datetime",
        },
      },
    },
    Login: {
      required: ["username", "password"],
      properties: {
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
        path: {
          type: "string",
        },
      },
    },
  },
  responses: {},
  parameters: {
    nickname: {
      name: "nickname",
      description: "nickname to use for signup.",
      in: "Body",
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
