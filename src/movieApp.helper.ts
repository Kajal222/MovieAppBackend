import jwt from "jsonwebtoken";
import { MovieAppConfig } from "./movieApp.config";
const { BaseConfig: { BaseConstants: { JWT_ISS, JWT_EXPIRY, JWT_SECRET } } } = MovieAppConfig;

export namespace MovieAppHelper {
  export class BaseHelper {
    public static GenerateToken = (useremail: string): string => {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + Number(JWT_EXPIRY));

      const token = jwt.sign(
        {
          iss: JWT_ISS,
          sub: useremail,
          iat: new Date().getTime(),
          exp: expiryDate.getTime(),
        },
        String(JWT_SECRET)
      );
      return token;
    }
  }
}
