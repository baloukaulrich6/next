import nc from 'next-connect'
import bcrypt from 'bcrypt'
import {validateEmail} from "../../../utils/validation.js"
import db from "../../../utils/db.js"
import User from '../../../models/User.js'
import {createActivationToken} from "../../../utils/token"
import {sendEmail} from '../../../utils/sendEmail'
const handler = nc()

handler.post(async (req, res) =>{
    try{
        await db.connectDb()
        const{name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({message:"Please enter fille in all fields."})
        }
        if(!validateEmail(email)){
            return res.status(400).json({message:"Invalid email."})
        }
        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message: "This email already exist."})
        }
        if(password.length < 6) {
            return res.status(400)
            .json({message: "password must be at least 6 characters"})
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({name, email, password: cryptedPassword});
        const addedUser = await newUser.save();
        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        })
       const url =`${process.env.BASE_URL}/activate/${activation_token}`
       sendEmail(email, url, "", "Activate your account.")

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

export default handler