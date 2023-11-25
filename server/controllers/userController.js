
import bcrypt from "bcrypt"
import User from "../model/User.js"

//This endpoint creates the account with few initial details
export  async function createAccount(req,res){
    try {
        const {email,mob,psswd}=req.body; 
        console.log(req.body)
        const userExists=await User.findOne({email});
        if(userExists){
         res.status(400);
         throw new Error("User already exists");
        }
        const hashedPsswd = await bcrypt.hash(psswd, 10);
        const user=new User({
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
//This endpoint creates the account with few initial details
export  async function saveData(req,res){
    try {
        const {email,title,fName,dob,addr,duration,info,status,savings}=req.body; 
        const data = await User.updateOne({email},{
            ...req.body
        })
        return res.status(200).send({success:true})
         
     } catch (error) {
         console.log(error);
         return res.status(500).send({error: "Internal Server Error"});
     }
}

//This endpoint creates the account with few initial details
export  async function getData(req,res){
    try {
        const {email}=req.query; 
        let data = await User.findOne({email}).select("-psswd")
        if(data){
            return res.status(200).send(data);
        }else{
            return res.status(500);
        }
         
     } catch (error) {
         console.log(error);
         return res.status(500).send({error: "Internal Server Error"});
     }
}

// Checks email validity in the Database
export  async function checkEmail(req,res){
    try {
        const {email}=req.body; 
        const userExists=await User.findOne({email});
        return userExists ? res.status(200).send({isUnique:false}) : res.status(200).send({isUnique:true});
     } catch (error) {
         console.log(error);
         return res.status(500).send({error: "Internal Server Error"});
     }  
}