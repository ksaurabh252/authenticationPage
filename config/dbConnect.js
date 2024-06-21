import mongoose from "mongoose";
const dbConnect = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "pageAuthentication",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION)
    console.log("connected to db");
  } catch (error) {
    console.log(`Error is ${error}`);
  }
};
export default dbConnect;
