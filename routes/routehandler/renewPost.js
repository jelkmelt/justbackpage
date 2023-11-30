import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";
export const post_renew = async (req, res) => {
  const id = req.user._id.toString();
  const { post_id } = req.params;
 
  try {
    const result = await Post.findOneAndUpdate(
      { _id: post_id },
      {
        renewedAt: new Date()
      },
      { new: true },
    );
    return res.status(200).json({ success: "renewed successfully" });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default post_renew;
