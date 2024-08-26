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
exports.MovieAppService = void 0;
const movie_model_1 = __importDefault(require("./models/movie.model"));
const user_model_1 = __importDefault(require("./models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const movieApp_config_1 = require("./movieApp.config");
const movieApp_helper_1 = require("./movieApp.helper");
// import { MovieAppModule } from './MovieApp.module';
const { MessagesConfig: { Error: { EMAIL_EXISTS_ERR } } } = movieApp_config_1.MovieAppConfig;
const { BaseHelper: { GenerateToken } } = movieApp_helper_1.MovieAppHelper;
// const { AWSModule: { UploadOnS3 } } = MovieAppModule;
var MovieAppService;
(function (MovieAppService) {
    var _a;
    class UserService {
    }
    _a = UserService;
    UserService.userRegister = (userData) => __awaiter(_a, void 0, void 0, function* () {
        let { body: { email, password } } = userData;
        try {
            email = email.toLowerCase();
            // Check if email already exists
            let existingUserEmail = yield user_model_1.default.findOne({ email: email });
            if (existingUserEmail) {
                throw new Error(EMAIL_EXISTS_ERR);
            }
            // Generate unique user ID
            let usersCount = yield user_model_1.default.countDocuments();
            const incrementingNumber = usersCount + 1;
            const incrementString = String(incrementingNumber).padStart(2, '0');
            const userId = `MovieApp${incrementString}`;
            // Generate token
            let token = GenerateToken(email);
            // Hash password
            let hashedPassword = yield bcrypt_1.default.hash(password, yield bcrypt_1.default.genSalt(10));
            // Create user object
            let created = yield user_model_1.default.create(Object.assign(Object.assign({}, userData.body), { password: hashedPassword, loginToken: token, email: email, userId: userId }));
            return created;
        }
        catch (error) {
            console.error('Error in user registration:', error);
            throw error; // Re-throw the error for centralized error handling
        }
    });
    MovieAppService.UserService = UserService;
    class MovieService {
        static getMovieList(movieData) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { body: { movieName } } = movieData;
                    const movieList = yield movie_model_1.default.find({ movieName: { $regex: movieName, $options: 'i' } });
                    return movieList;
                }
                catch (error) {
                    console.error('Error in getMovieList:', error);
                    throw error; // Re-throw the error for centralized error handling
                }
            });
        }
    }
    MovieAppService.MovieService = MovieService;
    class AddMovieService {
        static addMovie(movieData) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { body: { title, publishedYear, poster } } = movieData;
                    const movie = yield movie_model_1.default.create({
                        title,
                        publishedYear,
                        poster,
                    });
                    return movie;
                }
                catch (error) {
                    console.error('Error in addMovie:', error);
                    throw error; // Re-throw the error for centralized error handling
                }
            });
        }
    }
    MovieAppService.AddMovieService = AddMovieService;
    class UpdateMovieService {
        static updateMovie(movieData) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { body: { title, publishedYear, poster } } = movieData;
                    const movie = yield movie_model_1.default.create({
                        title,
                        publishedYear,
                        poster,
                    });
                    return movie;
                }
                catch (error) {
                    console.error('Error in updateMovie:', error);
                    throw error; // Re-throw the error for centralized error handling
                }
            });
        }
    }
    MovieAppService.UpdateMovieService = UpdateMovieService;
})(MovieAppService || (exports.MovieAppService = MovieAppService = {}));
