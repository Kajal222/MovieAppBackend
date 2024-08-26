"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieAppApplication = void 0;
const express_1 = __importStar(require("express"));
const movieApp_config_1 = require("./movieApp.config");
const cors_1 = __importDefault(require("cors"));
const movieApp_router_1 = require("./movieApp.router");
const { ModuleConfig: { ConnectDatabase }, BaseConfig: { BaseConstants: { PORT } } } = movieApp_config_1.MovieAppConfig;
const { UserRouter, MovieRouter } = movieApp_router_1.MovieAppRouter;
var MovieAppApplication;
(function (MovieAppApplication) {
    class MakeApplication {
        static startServer() {
            MakeApplication.BindApplicationMiddlewares();
            ConnectDatabase();
            MakeApplication.MovieApp.listen(PORT, () => {
                console.log(`MovieApp Server started on port ${PORT}`);
            });
        }
        static BindApplicationMiddlewares() {
            MakeApplication.MovieApp.use((0, express_1.json)());
            MakeApplication.MovieApp.use((0, express_1.urlencoded)({ extended: true }));
            MakeApplication.MovieApp.use((0, cors_1.default)());
            MakeApplication.MovieApp.use("user", UserRouter.default());
            MakeApplication.MovieApp.use("movie", MovieRouter.default());
        }
    }
    MakeApplication.MovieApp = (0, express_1.default)();
    MovieAppApplication.MakeApplication = MakeApplication;
})(MovieAppApplication || (exports.MovieAppApplication = MovieAppApplication = {}));
MovieAppApplication.MakeApplication.startServer();
