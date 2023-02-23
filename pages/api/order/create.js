import User from '../../../models/User'
import nc from 'next-connect'
import db from "../../../utils/db"
import auth from '../../../middleware/auth'
import Coupon from '../../../models/Coupon'
import Order from '../../../models/Order'
const handler = nc().use(auth)

handler.post(async (req, res) =>{
    try{
        db.connectDb()
        const {
            products, 
            shippingAddress, 
            paymentMethod, 
            total} = req.body;
            const user = await User.findById(req.user);
            const newOrder = await new Order({
                user: user.id,
                products,
                shippingAddress,
                paymentMethod,
                total,

            }).save();
        
   
        db.disconnectDb()
      return  res.json({
        order_id: newOrder.order_id,
      })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
})
export default handler 