import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";

export const single_post = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById({ _id: id });
    return res.status(200).json({ data: post });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default single_post;
