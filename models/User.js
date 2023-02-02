import mongoose from 'mongoose';
 const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:"Please enter you name"
    },
    email:{
        type: String,
        required : "Please enter your email",
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user",
    },
    image:{
        type: String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    emailVerified:{
        type: Boolean,
        default: false,
    },
    defaultPaymentMethod:{
        type: String,
        default: ""
    },
    address:[{
        firstName:{
            type: String,
        },
        lastName:{
            type: String,
        },
        phoneNumber1:{
            type: String,
        },
        phoneNumber2:{
            type: String,
        },
        address:{
            type: String,
        },
        city:{
            type: String,
        },
        state:{
            type: String,
        },
        country:{
            type: String,
        },
        active:{
            type: Boolean,
            default: false,
        },

    }]
 },
 {
    timestamps: true,
 }
 );
 const User = mongoose.models.User || mongoose.model('User', userSchema);
 export default User;