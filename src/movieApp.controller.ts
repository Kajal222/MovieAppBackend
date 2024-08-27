import { Request, Response, NextFunction } from 'express';
import { MovieAppService, } from './movieApp.services';
import { MovieAppConfig } from './movieApp.config';

const {
  MessagesConfig: {
    Success: { USER_REG_SUCCESS, USER_LOGOUT_SUCCESS },
    Error: { CATCH_ERR }
  }
} = MovieAppConfig;
const { UserService, MovieService } = MovieAppService


export namespace MovieAppController {
  export class UserController {

    public static register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        const user = await UserService.userRegister(request);
        response.status(200).json({
          status: true,
          message: USER_REG_SUCCESS,
          data: user,
        });
      } catch (error: unknown) {
        console.error('Error in register:', error, typeof error, JSON.stringify(error), { status: false, data: null, message: error });
        next(error); // Pass the error to the error handler
        // response.status(400).json({ status: false, data: null, message: error });
      }
    }
    public static login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        const user = await UserService.userlogin(request);
        response.status(200).json({
          status: true,
          message: USER_REG_SUCCESS,
          data: user,
        });
      } catch (error) {
        console.error('Error in login:', error);
        next(error);
      }
    }
    public static logout = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        const user = await UserService.logout(request);
        response.status(200).json({
          status: true,
          message: USER_LOGOUT_SUCCESS,
          data: user,
        });
      } catch (err: unknown) {

      }
    }
  }
  export class MovieController {
    public static getMovieList = async (request: Request, response: Response): Promise<void> => {
      try {
        const movies = await MovieService.getMovieList(request);
        response.status(200).json({
          status: true,
          message: "Movie List",
          data: movies,
        });
      } catch (error) {
        console.error('Error in getting movie list:', error);
        response.status(400).json({ status: false, data: null, message: CATCH_ERR });
      }
    }

    public static addMovie = async (request: Request, response: Response): Promise<void> => {
      try {
        await MovieService.addMovie(request);
        response.status(200).json({
          status: true,
          message: "Movie Added",
          data: null,
        });
      } catch (error) {
        console.error('Error in add movie:', error);
        response.status(400).json({ status: false, data: null, message: CATCH_ERR });
      }
    }

    public static updateMovie = async (request: Request, response: Response): Promise<void> => {
      try {
        await MovieService.updateMovie(request);
        response.status(200).json({
          status: true,
          message: "Movie Updated",
          data: null,
        });
      } catch (error) {
        console.error('Error in update movie:', error);
        response.status(400).json({ status: false, data: null, message: CATCH_ERR });
      }
    }
  }
}
