
import bcrypt from "bcrypt"
import User from "../model/User.js"

//This endpoint creates the account with few initial details
export  async function createAccount(){
    try {
        const {email,mob,psswd}=req.body; 
        const userExists=await User.findOne({email});
        if(userExists){
         res.status(400);
         throw new Error("User already exists");
        }
        const hashedPsswd = await bcrypt.hash(psswd, 10);
        const user=new userModel({
         email,
         mob,
         psswd:hashedPsswd,
        })
        await user.save();
        res.status(201).send({success:true});
     } catch (error) {
         console.log(error);
         return res.status(500).send({error: "Internal Server Error"});
     }
}

// Checks email validity in the Database
export  async function checkEmail(){
    try {
        const {email}=req.body; 
        const userExists=await User.findOne({email});
        return userExists ? res.status(200).send({isUnique:false}) : res.status(200).send({isUnique:true});
     } catch (error) {
         console.log(error);
         return res.status(500).send({error: "Internal Server Error"});
     }  
}