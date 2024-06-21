import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "Full name not provided"],
    trim: true,
  },
  email: { type: String, require: [true, "Email not provided"], trim: true },

  password: {
    type: String,
    required: true,
  },

  tc: {
    type: Boolean,

  },
});

const authenticationPage = mongoose.model("authenticationPage", userSchema);
export default authenticationPage;
