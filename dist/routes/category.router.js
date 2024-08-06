"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const validate_const_1 = require("../static/validate.const");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const param_middleware_1 = __importDefault(require("../middlewares/param.middleware"));
const body_middleware_1 = __importDefault(require("../middlewares/body.middleware"));
const categoryRouter = (0, express_1.Router)();
const categoryController = new category_controller_1.CategoryController();
categoryRouter.get("/", categoryController.getAllCategories.bind(categoryController));
categoryRouter.post("/", auth_middleware_1.default, (0, body_middleware_1.default)(validate_const_1.CATEGORY_CREATE), categoryController.createCategory.bind(categoryController));
categoryRouter.patch("/:id", auth_middleware_1.default, (0, param_middleware_1.default)(validate_const_1.ID_PARAM), (0, body_middleware_1.default)(validate_const_1.CATEGORY_UPDATE), categoryController.updateCategory.bind(categoryController));
categoryRouter.delete("/:id", auth_middleware_1.default, (0, param_middleware_1.default)(validate_const_1.ID_PARAM), categoryController.removeCategory.bind(categoryController));
exports.default = categoryRouter;
