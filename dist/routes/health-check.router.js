"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRouter = (0, express_1.Router)();
healthRouter.get("/", (req, res) => {
    return res.json({
        status: 200,
        message: "OK",
    });
});
exports.default = healthRouter;
