import * as dotenv from 'dotenv';
dotenv.config();


// import AWS from "aws-sdk";
import mongoose from "mongoose";
const { env: { PORT, DB_CONN_STRING, DB_NAME, JWT_EXPIRY, JWT_ISS, JWT_SECRET, AWS_SES_REGION, AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } } = process
// const { S3, config: AwsConfig } = AWS;
console.log("DB_CONN_STRING", DB_CONN_STRING)

export namespace MovieAppConfig {
    export class BaseConfig {
        public static BaseConstants = {
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
        }
    }

    export class MessagesConfig {
        public static Success = {
            CONNECTION_SUCCESS: "Connection to database established",
            SERVER_STARTED: "MovieApp User server listening on port PORT",
            USER_REG_SUCCESS: "User registered successfully",
            USER_LOGOUT_SUCCESS: "User logged out successfully",
        }

        public static Error = {
            CONNECTION_ERR: "Error with database connection",
            CATCH_ERR: "Something Went Wrong.",
            EMAIL_EXISTS_ERR: "Email is already taken",
            UNAUTHRAIZED_USER: 'unauthorized user'
        }
    }

    export class RoutesConfig {
        public static Routes = {
            USER_REGISTER: "/register",
            USER_LOGIN: "/login",
            USER_GET_ALL: "/getAll",
            GET_MOVIE_LIST: "/getMovieList",
            ADD_MOVIE: "/addMovie",
            UPDATE_MOVIE: "/updateMovie",
            LOGOUT: "/logOut",
        }
    }

    export class ModuleConfig {
        public static ConnectDatabase = async (): Promise<mongoose.Connection> => {
            if (typeof DB_CONN_STRING !== "string") {
                throw new Error("DB_CONN_STRING is not defined or not a string");
              }
            await (mongoose.connect(DB_CONN_STRING, { retryWrites: true, w: 'majority' })).catch(err => console.log("Unable to connect to database"));
            console.log("Database connected")
            return mongoose.connection; 
        }
    }
}

