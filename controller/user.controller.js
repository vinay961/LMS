import user from "../model/user.model.js";



export const register = async(req,res,next) =>{
    
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            throw new Error("All mentioned field is mandatory to fill..")
        }
        const useremail = await user.findOne({email});
        if(useremail){
            throw new Error("User already exist!!.");
        }
        const User = await user.create({
           name,
           email,
           password
        })
        res.status(200).json({
           success: true,
           message: "User create successfull"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Unable to create user,So please try again.."
        })
    }
}

export const userinfo = async(req,res,next) =>{
    const {email} = req.body;

    const userExist = await user.findOne({email});
    if(!userExist){
        throw new Error("User not Exist in our data..")
    }
    res.status(200).json({
        success: true,
        message: "User Found",
        userExist
    })
}