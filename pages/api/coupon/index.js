import User from '../../../models/User'
import nc from 'next-connect'
import db from "../../../utils/db"
import auth from '../../../middleware/auth'
import Coupon from '../../../models/Coupon'
const handler = nc()

handler.post(async (req, res) =>{
    try{
        db.connectDb()
        const {coupon, startDate, endDate, discount} = req.body;
        const test = await Coupon.findOne({ coupon })
        if(test){
            return res.status(400).json({
                message: "This Coupon name already exists, try with a different name"
            })
        }
        await new Coupon({
            coupon,
            startDate,
            endDate,
            discount,
        }).save()
        db.disconnectDb()
      return  res.json({
        message: "Coupon Created Successfully !",
        coupons: await Coupon.find({}),
          })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
})
export default handler 