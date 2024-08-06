"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthPath = {
    "/health": {
        get: {
            description: "health-check",
            tags: ["Health-check"],
            produces: ["application/json"],
            responses: {
                "200": {
                    description: "connection healthy",
                    schema: {
                        type: "object",
                        $ref: "#/definitions/health",
                    },
                },
            },
        },
    },
};
exports.default = healthPath;
