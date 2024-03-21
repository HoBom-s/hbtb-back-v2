"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = require("../controllers/tag.controller");
const validate_const_1 = require("../static/validate.const");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const param_middleware_1 = __importDefault(require("../middlewares/param.middleware"));
const body_middleware_1 = __importDefault(require("../middlewares/body.middleware"));
const cache_middleware_1 = __importDefault(require("../middlewares/cache.middleware"));
const tagRouter = (0, express_1.Router)();
const tagController = new tag_controller_1.TagController();
tagRouter.get("/", cache_middleware_1.default, tagController.getAllTags.bind(tagController));
tagRouter.post("/", auth_middleware_1.default, (0, body_middleware_1.default)(validate_const_1.TAG_CREATE), tagController.createTag.bind(tagController));
tagRouter.patch("/:id", auth_middleware_1.default, (0, param_middleware_1.default)(validate_const_1.ID_PARAM), (0, body_middleware_1.default)(validate_const_1.TAG_UPDATE), tagController.updateTag.bind(tagController));
tagRouter.delete("/:id", auth_middleware_1.default, (0, param_middleware_1.default)(validate_const_1.ID_PARAM), tagController.removeTag.bind(tagController));
exports.default = tagRouter;
