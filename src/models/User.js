import {Schema, model} from "mongoose";

// campos na tabela "user"
const UserSchema = new Schema({
  email: String,
});

export default model("User", UserSchema);
