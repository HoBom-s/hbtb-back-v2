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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const image_api_1 = __importDefault(require("../api/image.api"));
const error_middleware_1 = require("../middlewares/error.middleware");
class ImageService {
    constructor() { }
    uploadOneImage(info, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, uniqueString } = info;
            const ext = image.originalname.split(".").pop();
            const { buffer } = image, restInfo = __rest(image, ["buffer"]);
            const imageInfo = { uniqueString, buffer, path, ext };
            try {
                const response = yield image_api_1.default.post("/images/single", imageInfo);
                return response.data;
            }
            catch (error) {
                throw new error_middleware_1.CustomError(500, `${error}`);
            }
        });
    }
    removeOneImage(imageUrl) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const imageKey = (_a = imageUrl.split("amazonaws.com").pop()) === null || _a === void 0 ? void 0 : _a.slice(1);
            try {
                return image_api_1.default.post("/images/remove", { imageKey });
            }
            catch (error) {
                throw new error_middleware_1.CustomError(500, `${error}`);
            }
        });
    }
}
exports.ImageService = ImageService;
