"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieAppHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const movieApp_config_1 = require("./movieApp.config");
const { BaseConfig: { BaseConstants: { JWT_ISS, JWT_EXPIRY, JWT_SECRET } } } = movieApp_config_1.MovieAppConfig;
var MovieAppHelper;
(function (MovieAppHelper) {
    class BaseHelper {
    }
    BaseHelper.GenerateToken = (useremail) => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + Number(JWT_EXPIRY));
        const token = jsonwebtoken_1.default.sign({
            iss: JWT_ISS,
            sub: useremail,
            iat: new Date().getTime(),
            exp: expiryDate.getTime(),
        }, String(JWT_SECRET));
        return token;
    };
    MovieAppHelper.BaseHelper = BaseHelper;
})(MovieAppHelper || (exports.MovieAppHelper = MovieAppHelper = {}));
