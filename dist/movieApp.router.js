"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieAppRouter = void 0;
const express_1 = require("express");
const movieApp_config_1 = require("./movieApp.config");
const movieApp_middleware_1 = require("./movieApp.middleware");
const movieApp_controller_1 = require("./movieApp.controller");
const { RoutesConfig: { Routes: { USER_REGISTER, GET_MOVIE_LIST, ADD_MOVIE, UPDATE_MOVIE } } } = movieApp_config_1.MovieAppConfig;
const { MulterMiddleware } = movieApp_middleware_1.MovieAppMiddleware;
const { UserController, MovieController } = movieApp_controller_1.MovieAppController;
var MovieAppRouter;
(function (MovieAppRouter) {
    class UserRouter {
    }
    UserRouter.userRouter = (0, express_1.Router)();
    UserRouter.default = () => {
        UserRouter.userRouter.post(USER_REGISTER, UserController.register);
        return UserRouter.userRouter;
    };
    MovieAppRouter.UserRouter = UserRouter;
    class MovieRouter {
    }
    MovieRouter.movieRouter = (0, express_1.Router)();
    MovieRouter.default = () => {
        MovieRouter.movieRouter.get(GET_MOVIE_LIST, MovieController.getMovieList);
        return MovieRouter.movieRouter;
    };
    MovieRouter.addMovieRouter = (0, express_1.Router)();
    MovieRouter.addMovie = () => {
        MovieRouter.addMovieRouter.post(ADD_MOVIE, MulterMiddleware.upload.any(), MovieController.addMovie);
        return MovieRouter.addMovieRouter;
    };
    MovieRouter.updateMovieRouter = (0, express_1.Router)();
    MovieRouter.updateMovie = () => {
        MovieRouter.updateMovieRouter.post(UPDATE_MOVIE, MulterMiddleware.upload.any(), MovieController.updateMovie);
        return MovieRouter.updateMovieRouter;
    };
    MovieAppRouter.MovieRouter = MovieRouter;
})(MovieAppRouter || (exports.MovieAppRouter = MovieAppRouter = {}));
