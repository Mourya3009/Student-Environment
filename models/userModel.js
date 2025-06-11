import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    studentID: String,
    password:String,
    profilepic: {
        type:String,
        default: "default.jpg"
    }
});

const userModel = mongoose.model("user",userSchema);
export default userModel;
