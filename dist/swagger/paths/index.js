"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_path_1 = __importDefault(require("./user.path"));
const tag_path_1 = __importDefault(require("./tag.path"));
const category_path_1 = __importDefault(require("./category.path"));
const article_path_1 = __importDefault(require("./article.path"));
const health_check_path_1 = __importDefault(require("./health-check.path"));
const routerApi = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, user_path_1.default), tag_path_1.default), category_path_1.default), article_path_1.default), health_check_path_1.default);
exports.default = routerApi;
