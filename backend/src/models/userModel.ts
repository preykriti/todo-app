import mongoose, { Schema } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string,
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser> ({
    name:{type: String, required:true},
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true},
})