import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userAccountSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    cdcVerification:{
        type: Boolean,
        required: true,
        default: false
    },
    cocVerification:{
        type: Boolean,
        required: true,
        default: false
    },
    jobTitle:{
        type: String,
        default: "None"
    },
    company:{
        type: String,
        default: "None"
    },
    location:{
        type: String,
        default: "None"
    },
    phoneNumber:{
        type: String,
        default: "None"
    },
    homeAddress:{
        type: String,
        default: "None"
    },
    profilePic:{
        type: String,
        default: "None"
    },
    profileBanner:{
        type: String,
        default: "None"
    }
},
    {
        timestamps:true
    }
);

userAccountSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const UserAccount = mongoose.model('user accounts', userAccountSchema)