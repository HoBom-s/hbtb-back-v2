"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validate_const_1 = require("../static/validate.const");
const joi_const_1 = require("../static/joi.const");
class JoiSchemaMaker {
    createSchema(target) {
        switch (target) {
            case validate_const_1.ID_PARAM:
                this.schema = joi_const_1.idParam;
                break;
            case validate_const_1.ARTICLE_CREATE:
                this.schema = joi_const_1.articleCreate;
                break;
            case validate_const_1.ARTICLE_UPDATE:
                this.schema = joi_const_1.articleUpdate;
                break;
            case validate_const_1.CATEGORY_CREATE:
                this.schema = joi_const_1.categoryCreate;
                break;
            case validate_const_1.CATEGORY_UPDATE:
                this.schema = joi_const_1.categoryUpdate;
                break;
            case validate_const_1.TAG_CREATE:
                this.schema = joi_const_1.tagCreate;
                break;
            case validate_const_1.TAG_UPDATE:
                this.schema = joi_const_1.tagUpdate;
                break;
            case validate_const_1.USER_CREATE:
                this.schema = joi_const_1.userCreate;
                break;
            case validate_const_1.USER_LOGIN:
                this.schema = joi_const_1.userLogin;
                break;
            case validate_const_1.USER_UPDATE:
                this.schema = joi_const_1.userUpdate;
                break;
        }
        return joi_1.default.object(this.schema);
    }
}
class ValidateHelper {
    asJoiSchema(target) {
        return new JoiSchemaMaker().createSchema(target);
    }
}
exports.default = ValidateHelper;
