import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import bcrypt from 'bcrypt'
const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    db.connectDb();
    const { current_password, password } = req.body;
    const user = await User.findById(req.user);
    const crypted_password = await bcrypt.hash(password, 12)
    const isMatch = await bcrypt.compare(current_password, user.password);
    if(!user.password){
      await user.updateOne({
        password: crypted_password,
      })
      return res.status(200).json({message: "we noticed you are using a social login so we added a password to login"})
    }
    if(!isMatch){
      return res.status(400).json({message: "Current password is Wrong!"})
    }
    await user.updateOne({
      password : crypted_password 
    })
    db.disconnectDb();
    res.json({message: "Password has changes Successfully"})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
