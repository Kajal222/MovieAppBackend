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
exports.MovieAppConfig = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// import AWS from "aws-sdk";
const mongoose_1 = __importDefault(require("mongoose"));
const { env: { PORT, DB_CONN_STRING, DB_NAME, JWT_EXPIRY, JWT_ISS, JWT_SECRET, AWS_SES_REGION, AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } } = process;
// const { S3, config: AwsConfig } = AWS;
console.log("DB_CONN_STRING", DB_CONN_STRING);
var MovieAppConfig;
(function (MovieAppConfig) {
    var _a;
    class BaseConfig {
    }
    BaseConfig.BaseConstants = {
        PORT,
        DB_CONN_STRING,
        DB_NAME,
        JWT_EXPIRY,
        JWT_ISS,
        JWT_SECRET,
        AWS_SES_REGION,
        AWS_SES_ACCESS_KEY_ID,
        AWS_SES_SECRET_ACCESS_KEY,
        AWS_S3_BUCKET_NAME
    };
    MovieAppConfig.BaseConfig = BaseConfig;
    class MessagesConfig {
    }
    MessagesConfig.Success = {
        CONNECTION_SUCCESS: "Connection to database established",
        SERVER_STARTED: "MovieApp User server listening on port PORT",
        USER_REG_SUCCESS: "User registered successfully",
    };
    MessagesConfig.Error = {
        CONNECTION_ERR: "Error with database connection",
        CATCH_ERR: "Something Went Wrong.",
        EMAIL_EXISTS_ERR: "Email is already taken",
    };
    MovieAppConfig.MessagesConfig = MessagesConfig;
    class RoutesConfig {
    }
    RoutesConfig.Routes = {
        USER_REGISTER: "/register",
        USER_LOGIN: "/login",
        GET_MOVIE_LIST: "/getMovieList",
        ADD_MOVIE: "/addMovie",
        UPDATE_MOVIE: "/updateMovie",
        LOGOUT: "/logOut",
    };
    MovieAppConfig.RoutesConfig = RoutesConfig;
    class ModuleConfig {
    }
    _a = ModuleConfig;
    ModuleConfig.ConnectDatabase = () => __awaiter(_a, void 0, void 0, function* () {
        if (typeof DB_CONN_STRING !== "string") {
            throw new Error("DB_CONN_STRING is not defined or not a string");
        }
        yield (mongoose_1.default.connect(DB_CONN_STRING, { retryWrites: true, w: 'majority' })).catch(err => console.log("Unable to connect to database"));
        console.log("Database connected");
        return mongoose_1.default.connection;
    });
    MovieAppConfig.ModuleConfig = ModuleConfig;
})(MovieAppConfig || (exports.MovieAppConfig = MovieAppConfig = {}));
