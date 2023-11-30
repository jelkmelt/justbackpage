import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";

export const get_data = async (req, res) => {
  const id = req.user._id.toString();

  try {
    const user = await User.findById({ _id: id });
    if (user) {
      const data = await Post.find({ user: id });
      return res.status(200).json({ data: data });
    }
    const admin = await Admin.findById({ _id: id });
    const data = await User.find();

    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default get_data;
