
import user from "../model/user.model.js";
const User  = user()


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

export const loginUser = async(req,res,next) =>{
    const {email,password} = req.body
    
    if(!email || !password){
        throw new Error('email and password is required.');
    }
    try {
        const userFound = await user.findOne({email}).select('+password');
        if(!(userFound && await userFound.comparePassword(password))){
            throw new Error('Email or password do not match or user does not exist.')
        }

        // Now we need to generate token 
        const token = await userFound.generateJWTToken();
        user.password=undefined;

        const cookieOption = {
            maxAge: 24*60*60*1000,
            httpOnly: true
        }
        res.cookie("token",token,cookieOption);

        res.status(201).json({
           success: true,
           message: "Successfully signed in"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

export const logoutUser = async(req,res,next) =>{
    // setting cookie value to zero
    const cookieOption = {
        expire : new Date(),
        httpOnly:true
    }
    res.cookie("token",null,cookieOption);
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
}

export const userDetails = async(req,res,next) =>{
    const userinfo =  await user.findById(req.User.id);

    res.status(200).json({
        success:true,
        message:'User details',
        userinfo
    })
}