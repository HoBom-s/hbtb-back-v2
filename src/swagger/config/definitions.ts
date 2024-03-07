const definitions = {
  definitions: {
    foundUser: {
      type: "object",
      properties: {
        foundUser: {
          type: "object",
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
              example:
                "https://hobom.s3.ap-northeast-2.amazonaws.com/samho.jpg",
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
      },
    },
    createdUser: {
      type: "object",
      properties: {
        createdUser: {
          type: "object",
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
              example:
                "https://hobom.s3.ap-northeast-2.amazonaws.com/samho.jpg",
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
      },
    },
    accessToken: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Z6Lk88gifZXExg58cUCMNE25dLZ2tMHTdYXNiOdnHVU",
        },
      },
    },
    updatedUser: {
      type: "object",
      properties: {
        updatedUser: {
          type: "object",
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
              example:
                "https://hobom.s3.ap-northeast-2.amazonaws.com/samho.jpg",
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
    createdTag: {
      type: "object",
      properties: {
        createdTag: {
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
    updatedTag: {
      type: "object",
      properties: {
        updatedTag: {
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

    allCategories: {
      type: "object",
      properties: {
        allCategories: {
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
                example: "PROFILE",
              },
              path: {
                type: "string",
                example: "/profile",
              },
              sortIndex: {
                type: "number",
                example: 3,
              },
              spot: {
                type: "string",
                required: true,
                example: "H",
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
    createdCategory: {
      type: "object",
      properties: {
        createdCategory: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "1111111-23a4-5bc-6789-d8a36gw854d9",
            },
            title: {
              type: "string",
              example: "PROFILE",
            },
            path: {
              type: "string",
              example: "/profile",
            },
            sortIndex: {
              type: "number",
              example: 3,
            },
            spot: {
              type: "string",
              required: true,
              example: "H",
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
    updatedCategory: {
      type: "object",
      properties: {
        updatedCategory: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "1111111-23a4-5bc-6789-d8a36gw854d9",
            },
            title: {
              type: "string",
              example: "PROFILE",
            },
            path: {
              type: "string",
              example: "/profile",
            },
            sortIndex: {
              type: "number",
              example: 3,
            },
            spot: {
              type: "string",
              required: true,
              example: "H",
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

    allArticles: {
      type: "object",
      properties: {
        allArticles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "1111111-23a4-5bc-6789-d8a36gw854d9",
              },
              thumbnail: {
                type: "string",
                example:
                  "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
              },
              title: {
                type: "string",
                example: "코딩과 간식의 상관관계",
              },
              subtitle: {
                type: "number",
                example: "간식의 중요성에 관하여...",
              },
              contents: {
                type: "string",
                required: true,
                example:
                  "인간들은 간식을 간과하곤 한다. 하지만 강아지들은 간식에 진심이다. 물론 나도 그렇다.",
              },
              path: {
                type: "string",
                required: true,
                example: "/about-treat",
              },
              createdAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
              updatedAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
              user: {
                type: "object",
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
                    example:
                      "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
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
              tags: {
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
      },
    },
    foundArticles: {
      type: "object",
      properties: {
        foundArticles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "1111111-23a4-5bc-6789-d8a36gw854d9",
              },
              thumbnail: {
                type: "string",
                example:
                  "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
              },
              title: {
                type: "string",
                example: "코딩과 간식의 상관관계",
              },
              subtitle: {
                type: "number",
                example: "간식의 중요성에 관하여...",
              },
              contents: {
                type: "string",
                required: true,
                example:
                  "인간들은 간식을 간과하곤 한다. 하지만 강아지들은 간식에 진심이다. 물론 나도 그렇다.",
              },
              path: {
                type: "string",
                required: true,
                example: "/about-treat",
              },
              createdAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
              updatedAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
              user: {
                type: "object",
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
                    example:
                      "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
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
              tags: {
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
      },
    },
    foundArticle: {
      type: "object",
      properties: {
        foundArticle: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "1111111-23a4-5bc-6789-d8a36gw854d9",
            },
            thumbnail: {
              type: "string",
              example:
                "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
            },
            title: {
              type: "string",
              example: "코딩과 간식의 상관관계",
            },
            subtitle: {
              type: "number",
              example: "간식의 중요성에 관하여...",
            },
            contents: {
              type: "string",
              required: true,
              example:
                "인간들은 간식을 간과하곤 한다. 하지만 강아지들은 간식에 진심이다. 물론 나도 그렇다.",
            },
            path: {
              type: "string",
              required: true,
              example: "/about-treat",
            },
            createdAt: {
              type: "date",
              example: "2023-07-18T03:22:39.803Z",
            },
            updatedAt: {
              type: "date",
              example: "2023-07-18T03:22:39.803Z",
            },
            user: {
              type: "object",
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
                  example:
                    "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
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
            tags: {
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
    },
    articlesAndPageCount: {
      type: "object",
      properties: {
        perPage: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "1111111-23a4-5bc-6789-d8a36gw854d9",
              },
              thumbnail: {
                type: "string",
                example:
                  "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
              },
              title: {
                type: "string",
                example: "코딩과 간식의 상관관계",
              },
              subtitle: {
                type: "number",
                example: "간식의 중요성에 관하여...",
              },
              contents: {
                type: "string",
                required: true,
                example:
                  "인간들은 간식을 간과하곤 한다. 하지만 강아지들은 간식에 진심이다. 물론 나도 그렇다.",
              },
              path: {
                type: "string",
                required: true,
                example: "/about-treat",
              },
              createdAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
              updatedAt: {
                type: "date",
                example: "2023-07-18T03:22:39.803Z",
              },
              user: {
                type: "object",
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
                    example:
                      "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
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
            },
          },
        },
        pageNumber: {
          type: "number",
          example: "3",
        },
      },
    },
    createdArticle: {
      type: "object",
      properties: {
        createdArticle: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "1111111-23a4-5bc-6789-d8a36gw854d9",
            },
            thumbnail: {
              type: "string",
              example:
                "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
            },
            title: {
              type: "string",
              example: "코딩과 간식의 상관관계",
            },
            subtitle: {
              type: "number",
              example: "간식의 중요성에 관하여...",
            },
            contents: {
              type: "string",
              required: true,
              example:
                "인간들은 간식을 간과하곤 한다. 하지만 강아지들은 간식에 진심이다. 물론 나도 그렇다.",
            },
            path: {
              type: "string",
              required: true,
              example: "/about-treat",
            },
            createdAt: {
              type: "date",
              example: "2023-07-18T03:22:39.803Z",
            },
            updatedAt: {
              type: "date",
              example: "2023-07-18T03:22:39.803Z",
            },
            user: {
              type: "object",
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
                  example:
                    "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
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
            tags: {
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
    },
    updatedArticle: {
      type: "object",
      properties: {
        updatedArticle: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "1111111-23a4-5bc-6789-d8a36gw854d9",
            },
            thumbnail: {
              type: "string",
              example:
                "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
            },
            title: {
              type: "string",
              example: "코딩과 간식의 상관관계",
            },
            subtitle: {
              type: "number",
              example: "간식의 중요성에 관하여...",
            },
            contents: {
              type: "string",
              required: true,
              example:
                "인간들은 간식을 간과하곤 한다. 하지만 강아지들은 간식에 진심이다. 물론 나도 그렇다.",
            },
            path: {
              type: "string",
              required: true,
              example: "/about-treat",
            },
            createdAt: {
              type: "date",
              example: "2023-07-18T03:22:39.803Z",
            },
            updatedAt: {
              type: "date",
              example: "2023-07-18T03:22:39.803Z",
            },
            user: {
              type: "object",
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
                  example:
                    "https://hobom.s3.ap-northeast-2.amazonaws.com/laphoo.jpg",
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
            tags: {
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
    },
  },
};

export default definitions;
