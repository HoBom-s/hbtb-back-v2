const articlePath = {
  "/articles/": {
    get: {
      description: "get all articles information",
      tags: ["Article"],
      produces: ["application/json"],

      responses: {
        "200": {
          description: "`data` get all articles success",
          schema: {
            type: "object",
            $ref: "#/definitions/allArticles",
          },
        },
      },
    },

    post: {
      description: "create one article",
      tags: ["Article"],
      consumes: ["multipart/form-data"],
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
          in: "formData",
          name: "title",
          type: "string",
          required: true,
          description: "title for the article",
        },
        {
          in: "formData",
          name: "thumbnail",
          type: "file",
          required: false,
          description: "thumbnail image for the article",
        },
        {
          in: "formData",
          name: "subtitle",
          type: "string",
          required: true,
          description: "subtitle for the article",
        },
        {
          in: "formData",
          name: "contents",
          type: "string",
          required: true,
          description: "contents for the article",
        },
        {
          in: "formData",
          name: "tags",
          type: "string",
          required: true,
          description: "tags with string separated with comma",
          example: "Laphoo, Samho",
        },
        {
          in: "formData",
          name: "path",
          type: "string",
          required: true,
          description: "path for the article",
        },
      ],
      responses: {
        "201": {
          description: "`data` create one article success",
          schema: {
            type: "object",
            $ref: "#/definitions/createdArticle",
          },
        },
      },
    },
  },

  "/articles/list/{path}": {
    get: {
      description: "get one article information by article path",
      tags: ["Article"],
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "path",
          schema: {
            type: "string",
          },
          required: true,
          description: "req.params for article path (path without `/`)",
        },
      ],
      responses: {
        "201": {
          description:
            "`data` get one article information by article path success",
          schema: {
            type: "object",
            $ref: "#/definitions/foundArticle",
          },
        },
      },
    },
  },

  "/articles/search": {
    get: {
      description: "get all searched articles information",
      tags: ["Article"],
      produces: ["application/json"],
      parameters: [
        {
          in: "query",
          name: "keyword",
          type: "string",
          description: "search keyword for specific articles",
          required: true,
        },
      ],
      responses: {
        "200": {
          description: "`data` get all searched articles success",
          schema: {
            type: "object",
            $ref: "#/definitions/foundArticles",
          },
        },
      },
    },
  },

  "/articles/list": {
    get: {
      description: "get paginated articles & total page count",
      tags: ["Article"],
      produces: ["application/json"],
      parameters: [
        {
          in: "query",
          name: "pageNumber",
          type: "number",
          description: "clicked page number",
          required: true,
        },
        {
          in: "query",
          name: "perPage",
          type: "string",
          description: "article count for each page to include",
          required: true,
        },
        {
          in: "query",
          name: "sorting",
          type: "string",
          description:
            "article sorting(optional): one of `asc` or `desc`(case-insensitive)",
          required: false,
        },
      ],
      responses: {
        "200": {
          description: "`data` get pagination information success",
          schema: {
            type: "object",
            $ref: "#/definitions/articlesAndPageCount",
          },
        },
      },
    },
  },

  "/articles/{articleId}": {
    patch: {
      description: "update one article information by articleID",
      tags: ["Article"],
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
          name: "articleId",
          schema: {
            type: "string",
          },
          required: true,
          description: "req.params articleId",
        },
        {
          in: "formData",
          name: "title",
          type: "string",
          required: false,
          description: "title for the article",
        },
        {
          in: "formData",
          name: "thumbnail",
          type: "file",
          required: false,
          description: "thumbnail image for the article",
        },
        {
          in: "formData",
          name: "subtitle",
          type: "string",
          required: false,
          description: "subtitle for the article",
        },
        {
          in: "formData",
          name: "contents",
          type: "string",
          required: false,
          description: "contents for the article",
        },
        {
          in: "formData",
          name: "tags",
          type: "string",
          required: false,
          description: "tags with string separated with comma",
          example: "Laphoo, Samho",
        },
        {
          in: "formData",
          name: "path",
          type: "string",
          required: false,
          description: "path for the article",
        },
      ],
      responses: {
        "201": {
          description: "`data` update one article information success",
          schema: {
            type: "object",
            $ref: "#/definitions/updatedArticle",
          },
        },
      },
    },

    delete: {
      description: "delete one article information by articleID",
      tags: ["Article"],
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
          name: "articleId",
          schema: {
            type: "string",
          },
          required: true,
          description: "req.params articleId",
        },
      ],
      responses: {
        "201": {
          description: "delete one article information success",
          schema: {
            type: "string",
            example: "Delete article success.",
          },
        },
      },
    },
  },
};

export default articlePath;
