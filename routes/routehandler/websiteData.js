import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";

export const website_data = async (req, res) => {
  const { category, city } = req.params;

  try {
    const post = await Post.find({ category, city }).sort({ renewedAt: -1 })
    return res.status(200).json({ data: post });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default website_data;
