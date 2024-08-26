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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieAppController = void 0;
const movieApp_services_1 = require("./movieApp.services");
const movieApp_config_1 = require("./movieApp.config");
const { MessagesConfig: { Success: { USER_REG_SUCCESS }, Error: { CATCH_ERR } } } = movieApp_config_1.MovieAppConfig;
const { UserService, MovieService, AddMovieService, UpdateMovieService } = movieApp_services_1.MovieAppService;
var MovieAppController;
(function (MovieAppController) {
    var _a, _b;
    class UserController {
    }
    _a = UserController;
    UserController.register = (request, response) => __awaiter(_a, void 0, void 0, function* () {
        try {
            const user = yield UserService.userRegister(request);
            response.status(200).json({
                status: true,
                message: USER_REG_SUCCESS,
                data: user,
            });
        }
        catch (error) {
            console.error('Error in user registration:', error);
            response.status(400).json({ status: false, data: null, message: CATCH_ERR });
        }
    });
    MovieAppController.UserController = UserController;
    class MovieController {
    }
    _b = MovieController;
    MovieController.getMovieList = (request, response) => __awaiter(_b, void 0, void 0, function* () {
        try {
            const movies = yield MovieService.getMovieList(request);
            response.status(200).json({
                status: true,
                message: "Movie List",
                data: movies,
            });
        }
        catch (error) {
            console.error('Error in getting movie list:', error);
            response.status(400).json({ status: false, data: null, message: CATCH_ERR });
        }
    });
    MovieController.addMovie = (request, response) => __awaiter(_b, void 0, void 0, function* () {
        try {
            const movies = yield AddMovieService.addMovie(request);
            response.status(200).json({
                status: true,
                message: "Movie List",
                data: movies,
            });
        }
        catch (error) {
            console.error('Error in getting movie list:', error);
            response.status(400).json({ status: false, data: null, message: CATCH_ERR });
        }
    });
    MovieController.updateMovie = (request, response) => __awaiter(_b, void 0, void 0, function* () {
        try {
            const movies = yield UpdateMovieService.updateMovie(request);
            response.status(200).json({
                status: true,
                message: "Movie List",
                data: movies,
            });
        }
        catch (error) {
            console.error('Error in getting movie list:', error);
            response.status(400).json({ status: false, data: null, message: CATCH_ERR });
        }
    });
    MovieAppController.MovieController = MovieController;
})(MovieAppController || (exports.MovieAppController = MovieAppController = {}));
