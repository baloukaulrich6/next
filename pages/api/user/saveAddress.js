import Cart from '../../../models/Cart'
import Product from '../../../models/Product'
import User from '../../../models/User'
import nc from 'next-connect'
import db from "../../../utils/db"
const handler = nc()

handler.post(async (req, res) =>{
    try{
        db.connectDb()
        const {address, user_id} = req.body
        const user = User.findById(user_id)
        await user.updateOne({
            $push:{
                address: address,
            }
        })
        res.json(address)
        db.disconnectDb()
    }catch(err){
        return res.status(500).json({message: err.message})
    }
})
export default handler