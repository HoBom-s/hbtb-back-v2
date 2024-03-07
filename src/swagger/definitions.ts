const definitions = {
  definitions: {
    userInfo: {
      properties: {
        id: {
          type: "string",
          example: "1111111-23a4-5bc-6789-d8a36gw854d9",
        },
        nickname: {
          type: "string",
          example: "Samho",
        },
        profileImg: {
          type: "string",
          example: "https://hobom.s3.ap-northeast-2.amazonaws.com/samho.jpg",
        },
        role: {
          type: "string",
          example: "user",
        },
        introduction: {
          type: "string",
          example: "More Churu",
        },
        createdAt: {
          type: "date",
          example: "2023-07-18T03:22:39.803Z",
        },
        updatedAt: {
          type: "date",
          example: "2023-07-18T03:22:39.803Z",
        },
      },
    },
    accessToken: {
      properties: {
        accessToken: {
          type: "string",
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Z6Lk88gifZXExg58cUCMNE25dLZ2tMHTdYXNiOdnHVU",
        },
      },
    },
    foundTags: {
      type: "object",
      properties: {
        foundTags: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "1111111-23a4-5bc-6789-d8a36gw854d9",
              },
              title: {
                type: "string",
                example: "Laphoo",
              },
              path: {
                type: "string",
                example: "/laphoo",
              },
              count: {
                type: "number",
                example: 0,
              },
              createdAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
              updatedAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
            },
          },
        },
      },
    },
    tagInfo: {
      properties: {
        id: {
          type: "string",
          example: "1111111-23a4-5bc-6789-d8a36gw854d9",
        },
        title: {
          type: "string",
          example: "Laphoo",
        },
        path: {
          type: "string",
          example: "/laphoo",
        },
        count: {
          type: "number",
          example: 0,
        },
        createdAt: {
          type: "date",
          example: "2023-07-18T03:22:39.803Z",
        },
        updatedAt: {
          type: "date",
          example: "2023-07-18T03:22:39.803Z",
        },
      },
    },
  },
};

export default definitions;
