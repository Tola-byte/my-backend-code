import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    agreement: {
      type: Boolean,
      default: false,
    },
    sectors: 
      {
       // type: String,
        type: Schema.Types.ObjectId,
        ref: "Sector",
      },
    
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.__v;
  return userObject;
};

const User = model("User", UserSchema);
export default User;
