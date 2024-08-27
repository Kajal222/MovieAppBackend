import { JwtPayload } from "jsonwebtoken";

export interface IcustomRequest extends Request {
    user?: JwtPayload | string;
}