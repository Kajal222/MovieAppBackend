import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { MovieAppHelper } from './movieApp.helper';
import { MovieAppConfig } from './movieApp.config';
const { BaseHelper: { jwtVerify } } = MovieAppHelper;
const { MessagesConfig: { Error: { NO_TOKEN_ERR, PASS_TOKEN_INVD_ERR } } } = MovieAppConfig;

export interface IcustomRequest extends Request {
    user?: JwtPayload | string;
}
export namespace MovieAppMiddleware {
    export class MulterMiddleware {
        private static storage: multer.StorageEngine = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads'); // Change Path Here
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}${path.extname(file.originalname)}`);
            }
        });

        public static upload = multer({ storage: this.storage });
    }
    export class ErrorMiddleware extends Error {
        public static HandleError = (error: any, req: Request, res: Response, next: NextFunction) => {
            console.log("error log", error)
            const status = error.status || 400;
            const message = error.message || 'Something went wrong';
            const data = error.data || null;
            res.status(status).json({
                status: false,
                code: status,
                message: message,
                data: data,
            });
        };
    }
    export class jwtMiddleware {
        public static verifyToken = (
            req: IcustomRequest,
            res: Response,
            next: NextFunction
        ) => {
            try {
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        status: false,
                        error: NO_TOKEN_ERR,
                        data: null,
                    });
                } else {
                    const token = req.headers.authorization.split("Bearer ")[1];
                    if (!token) {
                        return res.status(401).json({
                            status: false,
                            error: PASS_TOKEN_INVD_ERR,
                            data: null,
                        });
                    }

                    req.user = jwtVerify(token);
                    next();
                }
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    error: PASS_TOKEN_INVD_ERR,
                    data: null,
                });
            }
        };
    }
}
