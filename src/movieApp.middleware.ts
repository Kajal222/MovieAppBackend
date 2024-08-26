import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

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
}
