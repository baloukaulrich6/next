import User from '../../../models/User'
import nc from 'next-connect'
import db from "../../../utils/db"
import auth from '../../../middleware/auth'
const handler = nc().use(auth)

handler.post(async (req, res) =>{
    try{
        db.connectDb()
        const {address} = req.body
        const user = User.findById(req.user)
        await user.updateOne({
            $push:{
                address: address,
            }
        },{new: true})
 
        db.disconnectDb()
      return  res.json({addresses: user.address})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
})
export default handler 