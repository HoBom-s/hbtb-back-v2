"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdate = exports.userLogin = exports.userCreate = exports.tagUpdate = exports.tagCreate = exports.categoryUpdate = exports.categoryCreate = exports.articleUpdate = exports.articleCreate = exports.pathParam = exports.idParam = void 0;
const joi_1 = __importDefault(require("joi"));
const idParam = {
    id: joi_1.default.string().required(),
};
exports.idParam = idParam;
const pathParam = {
    path: joi_1.default.string().required(),
};
exports.pathParam = pathParam;
const articleCreate = {
    title: joi_1.default.string().required(),
    subtitle: joi_1.default.string().required(),
    contents: joi_1.default.string().required(),
    path: joi_1.default.string().required(),
    tags: joi_1.default.string().required(),
};
exports.articleCreate = articleCreate;
const articleUpdate = {
    title: joi_1.default.string().optional(),
    subtitle: joi_1.default.string().optional(),
    contents: joi_1.default.string().optional(),
    path: joi_1.default.string().optional(),
};
exports.articleUpdate = articleUpdate;
const categoryCreate = {
    title: joi_1.default.string().required(),
    path: joi_1.default.string().required(),
    spot: joi_1.default.string().required(),
};
exports.categoryCreate = categoryCreate;
const categoryUpdate = {
    title: joi_1.default.string().optional(),
    path: joi_1.default.string().optional(),
    spot: joi_1.default.string().optional(),
};
exports.categoryUpdate = categoryUpdate;
const tagCreate = {
    title: joi_1.default.string().required(),
    path: joi_1.default.string().required(),
};
exports.tagCreate = tagCreate;
const tagUpdate = {
    title: joi_1.default.string().optional(),
    path: joi_1.default.string().optional(),
};
exports.tagUpdate = tagUpdate;
const userCreate = {
    nickname: joi_1.default.string().required(),
    password: joi_1.default.string().optional(),
    introduction: joi_1.default.string().required(),
};
exports.userCreate = userCreate;
const userLogin = {
    nickname: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
};
exports.userLogin = userLogin;
const userUpdate = {
    nickname: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    profileImg: joi_1.default.string().optional(),
    introduction: joi_1.default.string().optional(),
};
exports.userUpdate = userUpdate;
