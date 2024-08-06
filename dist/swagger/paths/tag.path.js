"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tagPath = {
    "/tags/": {
        get: {
            description: "get all tags information",
            tags: ["Tag"],
            produces: ["application/json"],
            responses: {
                "200": {
                    description: "`data` get all tags success",
                    schema: {
                        type: "object",
                        $ref: "#/definitions/foundTags",
                    },
                },
            },
        },
        post: {
            description: "create one tag",
            tags: ["Tag"],
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
                    in: "body",
                    name: "req.body",
                    schema: {
                        type: "object",
                        properties: {
                            title: {
                                type: "string",
                                required: true,
                                example: "Laphoo",
                            },
                            path: {
                                type: "string",
                                required: true,
                                example: "/laphoo",
                            },
                        },
                    },
                    required: true,
                    description: "req.body object",
                },
            ],
            responses: {
                "201": {
                    description: "`data` create one tag success",
                    schema: {
                        type: "object",
                        $ref: "#/definitions/createdTag",
                    },
                },
            },
        },
    },
    "/tags/{tagId}": {
        patch: {
            description: "update one tag information by tagID",
            tags: ["Tag"],
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
                    name: "tagId",
                    schema: {
                        type: "string",
                    },
                    required: true,
                    description: "req.params tagId",
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
                                example: "Laphoo",
                            },
                            path: {
                                type: "string",
                                required: false,
                                example: "/laphoo",
                            },
                        },
                    },
                    required: true,
                    description: "req.body object",
                },
            ],
            responses: {
                "201": {
                    description: "`data` update one tag information success",
                    schema: {
                        type: "object",
                        $ref: "#/definitions/updatedTag",
                    },
                },
            },
        },
        delete: {
            description: "delete one tag information by tagID",
            tags: ["Tag"],
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
                    name: "tagId",
                    schema: {
                        type: "string",
                    },
                    required: true,
                    description: "req.params tagId",
                },
            ],
            responses: {
                "201": {
                    description: "delete one tag information success",
                    schema: {
                        type: "string",
                        example: "Delete tag success",
                    },
                },
            },
        },
    },
};
exports.default = tagPath;
