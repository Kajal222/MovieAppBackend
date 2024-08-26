import express, { Application, json, urlencoded } from 'express';
import { MovieAppConfig } from './movieApp.config';
import cors from 'cors';
import { MovieAppRouter } from './movieApp.router';
import { MovieAppMiddleware } from './movieApp.middleware';

const { ModuleConfig: { ConnectDatabase }, BaseConfig: { BaseConstants: { PORT } } } = MovieAppConfig;
const { UserRouter, MovieRouter } = MovieAppRouter
const { ErrorMiddleware: { HandleError} } = MovieAppMiddleware;

export namespace MovieAppApplication {
  export class MakeApplication {
    private static MovieApp: Application = express();

    public static startServer() {
      MakeApplication.BindApplicationMiddlewares();
      ConnectDatabase();
      MakeApplication.MovieApp.listen(PORT, () => {
        console.log(`MovieApp Server started on port ${PORT}`);
      });
    }

    private static BindApplicationMiddlewares() {
      MakeApplication.MovieApp.use(json());
      MakeApplication.MovieApp.use(urlencoded({ extended: true }));
      MakeApplication.MovieApp.use(cors());
      MakeApplication.MovieApp.use("/user", UserRouter.default());
      MakeApplication.MovieApp.use("/movie", MovieRouter.default());
      MakeApplication.MovieApp.use(HandleError);

    }
  }
}

MovieAppApplication.MakeApplication.startServer();
