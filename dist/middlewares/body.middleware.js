"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const error_middleware_1 = require("./error.middleware");
function bodyValidateMiddleware(target) {
    const validateHelper = new validate_helper_1.default();
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bodies = req.body;
                if (!bodies)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const isBodyValidate = yield validateHelper
                    .asJoiSchema(target)
                    .validateAsync(bodies);
                if (!isBodyValidate)
                    throw new error_middleware_1.CustomError(400, "Error: Request body validation failed. Please ensure that the provided data in the request body meets the required format and criteria.");
                next();
            }
            catch (error) {
                next(error);
            }
        });
    };
}
exports.default = bodyValidateMiddleware;
