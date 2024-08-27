import jwt, { JwtPayload } from "jsonwebtoken";
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
    public static jwtVerify = (token: string): JwtPayload["sub"] => {
      try {
        const decodedData = jwt.verify(token, String(JWT_SECRET)) as JwtPayload;

        if (
          typeof decodedData !== "object" ||
          decodedData === null ||
          !("sub" in decodedData)
        ) {
          throw new Error("Invalid JWT payload structure");
        }

        return decodedData.sub;
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          throw new Error(`JWT verification failed: ${error.message}`);
        } else if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(
            "An unexpected error occurred during JWT verification"
          );
        }
      }
    };
  }
}
