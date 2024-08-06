"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const error_middleware_1 = require("./error.middleware");
function paramValidateMiddleware(target) {
    const validateHelper = new validate_helper_1.default();
    return function (req, res, next) {
        try {
            const params = req.params;
            if (!params)
                throw new error_middleware_1.CustomError(400, "Error: Required parameter missing. Please ensure that all required parameters are provided.");
            const isParamValidate = validateHelper
                .asJoiSchema(target)
                .validateAsync(params);
            if (!isParamValidate)
                throw new error_middleware_1.CustomError(400, "Error: Required parameter missing. Please ensure that all required parameters are provided.");
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = paramValidateMiddleware;
