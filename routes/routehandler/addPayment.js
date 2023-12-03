import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";

export const add_payment = async (req, res) => {
  const id = req.user._id.toString();
  const { user_id } = req.params;
  const {credit } = req.body;

try{
    const user = await User.findOne({_id: user_id})
    user.credit= user.credit +  credit
    await user.save()
    return res.status(200).json({ success:"balanace added successfully" })

}
catch(e){
    return res.status(400).json({ error: "something wrong" });

}
 
};

export default add_payment;
