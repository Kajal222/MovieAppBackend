import { Router } from 'express';
import { MovieAppConfig } from './movieApp.config';
import { MovieAppMiddleware } from './movieApp.middleware';
import { MovieAppController } from './movieApp.controller';
const { RoutesConfig: { Routes: { USER_REGISTER, USER_LOGIN, GET_MOVIE_LIST, ADD_MOVIE, UPDATE_MOVIE, LOGOUT } } } = MovieAppConfig
const { MulterMiddleware, jwtMiddleware } = MovieAppMiddleware
const { UserController, MovieController } = MovieAppController

export namespace MovieAppRouter {
    export class UserRouter {
        private static userRouter: Router = Router()
        public static default = () => {
            UserRouter.userRouter.post(USER_REGISTER, UserController.register);
            UserRouter.userRouter.post(USER_LOGIN, UserController.login);
            UserRouter.userRouter.post(LOGOUT, jwtMiddleware.verifyToken, UserController.logout);
            return UserRouter.userRouter;
        }
    }
    export class MovieRouter {
        private static movieRouter: Router = Router()
        public static default = () => {
            MovieRouter.movieRouter.get(GET_MOVIE_LIST, jwtMiddleware.verifyToken, MovieController.getMovieList);
            MovieRouter.movieRouter.post(ADD_MOVIE, jwtMiddleware.verifyToken, MulterMiddleware.upload.any(), MovieController.addMovie);
            MovieRouter.movieRouter.post(UPDATE_MOVIE, jwtMiddleware.verifyToken, MulterMiddleware.upload.any(), MovieController.updateMovie);
            return MovieRouter.movieRouter;
        }


    }
}