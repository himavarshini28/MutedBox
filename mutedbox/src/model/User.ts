import mongoose,{Document,Mongoose,Schema} from 'mongoose';

export interface Message extends Document {
    content:string;
    createdAt:Date
}

const MessageSchema:Schema<Message> =new Schema({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[]
}

const UserSchema:Schema<User> =new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
,"Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password expiry is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    },
    messages:[MessageSchema],
})

const userModel =(mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",UserSchema)

export default userModel;


