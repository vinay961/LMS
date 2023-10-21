import { Schema,model, trusted } from "mongoose";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
const userSchema = new Schema({
    name:{
        type: String,
        require: [true,"Please fill the name field"],
        trim: true
    },
    email:{
        type: String,
        require: [true,"Please fill the email field"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        unique: true,
        require: [true,"Please fill the password field"],
        select: false
    },
    avatar: {
        public_id:{
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, {timestamps:true} )

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods = {
    // method that help us compare plain password with hashed password and returns true or false
    comparePassword: async function (plainPassword){
        return await bcrypt.compare(plainPassword,this.password);
    },

    // will generate a JWT token with user id as playload
    generateJWTToken: async function () {
        return await jwt.sign(
            { id: this._id, role: this.role, subscription: this._subscription },
            process.env.SECRET,
            {
                expiresIn: 24 * 60 * 60 
            }
        );
    }
}

const user = model('User',userSchema)
export default user