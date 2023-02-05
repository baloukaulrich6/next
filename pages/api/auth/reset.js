import nc from 'next-connect'
import bcrypt from 'bcrypt'
import {validateEmail} from "../../../utils/validation.js"
import db from "../../../utils/db.js"
import User from '../../../models/User.js'
import {createResetToken} from "../../../utils/token"
import {sendEmail} from '../../../utils/sendEmail'
import { resetEmailTemplate } from '../../../emails/resetEmailTemplate.js'

const handler = nc()

handler.put(async (req, res) =>{
    try{
        await db.connectDb()
       const{user_id, password} = req.body;
       const user = await User.findById(user_id)
       if(!user){
        return res.status(400).json({message: 'This Account does not exist.'});
       }
       const cryptedPassword = await bcrypt.hash(password,12)
       await user.updateOne({
        password: cryptedPassword
       })
       res.json({email: user.email})
       await db.disconnectDb();
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

export default handler