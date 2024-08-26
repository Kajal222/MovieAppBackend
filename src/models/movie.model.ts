import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  publishedYear: number | string;
  poster: string;
  email: string;
}

const movieSchema: Schema<IMovie> = new Schema(
  {
    title: { type: String, default: null },
    publishedYear: { type: String, default: null },
    poster: { type: String, default: null },
    email: { type: String, default: null }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Movie = mongoose.model<IMovie>('Movies', movieSchema);

export default Movie;
