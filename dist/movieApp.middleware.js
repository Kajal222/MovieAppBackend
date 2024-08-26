"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieAppMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
var MovieAppMiddleware;
(function (MovieAppMiddleware) {
    var _a;
    class MulterMiddleware {
    }
    _a = MulterMiddleware;
    MulterMiddleware.storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../uploads'); // Change Path Here
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${path_1.default.extname(file.originalname)}`);
        }
    });
    MulterMiddleware.upload = (0, multer_1.default)({ storage: _a.storage });
    MovieAppMiddleware.MulterMiddleware = MulterMiddleware;
})(MovieAppMiddleware || (exports.MovieAppMiddleware = MovieAppMiddleware = {}));
