import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password:  string | null;
  loginToken: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, default: null },
    password: { type: String, default: null },
    loginToken: { type: String, default: null }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('Users', UserSchema);

export default User;
