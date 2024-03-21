"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameters = {
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
exports.default = parameters;
