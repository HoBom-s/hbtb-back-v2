"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = __importDefault(require("./paths"));
const definitions_1 = __importDefault(require("./config/definitions"));
const parameters_1 = __importDefault(require("./config/parameters"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const apiSpec = Object.assign(Object.assign(Object.assign({ info: {
        title: "HoBom Tech Blog API Docs",
        version: "2.0.0",
        description: "HBTB-version2 api docs.",
    }, host: `localhost:${process.env.DB_PORT}`, basePath: "/api/v2", swagger: "2.0", paths: Object.assign({}, paths_1.default) }, definitions_1.default), parameters_1.default), { tags: [
        {
            name: "User",
            description: "Users management (including signup, login, etc.)",
        },
        {
            name: "Tag",
            description: "Tags CRUD",
        },
        {
            name: "Article",
            description: "Articles CRUD (including thumbnail upload)",
        },
        {
            name: "Category",
            description: "Category CRUD",
        },
        {
            name: "Health-check",
            description: "Health-checking",
        },
    ] });
exports.default = apiSpec;
