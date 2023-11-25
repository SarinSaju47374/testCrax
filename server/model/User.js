import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mob: {
            type: Number,
            required: true,

        },
        psswd: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            enum: ['Ms', 'Mr', 'Mrs', 'Other'],
        },
        fName: {
            type: String,
        },
        dob:{
            type:Date,
        },
        addr:{
            type:String,
        },
        duration:{
            type:Number,
        },
        info:{
            type:String,
        },
        status:{
            type:String,
        },
        savings:{
            type:Number,
        },
    },
    {
        timestamps:true,
    }
);

const User = mongoose.model('User',userSchema);

export default User;