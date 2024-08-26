import Movie, { IMovie } from './models/movie.model';
import User, { IUser } from './models/user.model';
import bcrypt from 'bcrypt';
import { MovieAppConfig } from './movieApp.config';
import { MovieAppHelper } from './movieApp.helper';
import { ObjectId } from 'mongodb';
// import { MovieAppModule } from './MovieApp.module';

const { MessagesConfig: { Error: { EMAIL_EXISTS_ERR, UNAUTHRAIZED_USER } } } = MovieAppConfig;
const { BaseHelper: { GenerateToken } } = MovieAppHelper;
// const { AWSModule: { UploadOnS3 } } = MovieAppModule;

export namespace MovieAppService {
  export class UserService {

    public static userRegister = async (userData: Record<string, any>): Promise<IUser> => {
      let { body: { email, password } } = userData;

      try {
        email = email.toLowerCase();

        // Check if email already exists
        let existingUserEmail = await User.findOne({ email: email });
        if (existingUserEmail) {
          throw new Error(EMAIL_EXISTS_ERR);
        }

        // Generate unique user ID
        let usersCount = await User.countDocuments();
        const incrementingNumber = usersCount + 1;
        const incrementString = String(incrementingNumber).padStart(2, '0');
        const userId = `MovieApp${incrementString}`;

        // Generate token
        let token = GenerateToken(email);

        // Hash password
        let hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        // Create user object
        let created = await User.create({
          ...userData.body,
          password: hashedPassword,
          loginToken: token,
          email: email,
          userId: userId,
        });

        return created;

      } catch (error) {
        console.error('Error in user registration:', error);
        throw error; // Re-throw the error for centralized error handling
      }
    }
    public static userlogin = async (userData: Record<string, any>): Promise<Record<string, any>> => {
      let { body: { email, password } } = userData;

      try {
        email = email.toLowerCase();

        // Check if email already exists
        let existingUserEmail = await User.findOne({ email: email }).lean();
        if (!existingUserEmail) {
          throw new Error(UNAUTHRAIZED_USER);
        }
        // let userData = existingUserEmail?._doc
        let isCorrectPassword
        existingUserEmail?.password && (isCorrectPassword = await bcrypt.compare(password, existingUserEmail.password));
        if (!isCorrectPassword) throw new Error(UNAUTHRAIZED_USER);
        existingUserEmail.password = null;

        let token = GenerateToken(email);
        await User.updateOne({ email }, { loginToken: token })

        return { ...existingUserEmail, loginToken: token };
      } catch (error) {
        throw error;
      }
    }
    public static logout = async (userData: Record<string, any>): Promise<Record<string, any>> => {
      let { body: { email } } = userData;
      try {
        email = email.toLowerCase();

        // Check if email already exists
        let existingUserEmail = await User.findOne({ email: email }).lean();

        await User.updateOne({ email }, { loginToken: '' })

        return { ...existingUserEmail, loginToken: '' };
      } catch (error) {
        throw error;
      }
    }
  }

  export class MovieService {
    public static async getMovieList(movieData: Record<string, any>): Promise<IMovie[]> {
      try {
        const { query: { email } } = movieData;
        const movieList = await Movie.find({ email: email });
        return movieList;
      } catch (error) {
        console.error('Error in getMovieList:', error);
        throw error; // Re-throw the error for centralized error handling
      }
    }
    public static async addMovie(movieData: Record<string, any>): Promise<IMovie> {
      try {
        const { body: { title, publishedYear, email } } = movieData;
        const movie = await Movie.create({
          title,
          publishedYear,
          poster: movieData?.files[0]?.filename,
          email,
        });
        return movie;
      } catch (error) {
        console.error('Error in addMovie:', error);
        throw error; // Re-throw the error for centralized error handling
      }
    }
    public static async updateMovie(movieData: Record<string, any>): Promise<null> {
      try {
        const { body: { title, publishedYear, id } } = movieData;
        await Movie.updateOne({ _id: new ObjectId(id) }, {
          ...(title && { title }),
          ...(publishedYear && { publishedYear }),
          ...(movieData?.files?.length > 0 && { poster: movieData.files[0].filename }),
        });
        return null;
      } catch (error) {
        console.error('Error in updateMovie:', error);
        throw error; // Re-throw the error for centralized error handling
      }
    }
  }
}
