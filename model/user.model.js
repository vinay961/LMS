import { Schema,model, trusted } from "mongoose";
import bcrypt from "bcrypt"
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


const user = model('User',userSchema)
export default user