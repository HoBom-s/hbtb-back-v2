"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = __importDefault(require("./user.entity"));
const tag_entity_1 = __importDefault(require("./tag.entity"));
let Article = class Article {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Article.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
        default: "https://cdn.vectorstock.com/i/preview-1x/33/47/no-photo-available-icon-default-image-symbol-vector-40343347.jpg",
    }),
    __metadata("design:type", String)
], Article.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "nvarchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "nvarchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], Article.prototype, "subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "nvarchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], Article.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Article.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default),
    __metadata("design:type", user_entity_1.default)
], Article.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.default, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Article.prototype, "updatedAt", void 0);
Article = __decorate([
    (0, typeorm_1.Entity)()
], Article);
exports.default = Article;
