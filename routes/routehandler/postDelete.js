import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";
export const post_delete = async (req, res) => {
  const id = req.user._id.toString();
  const { post_id } = req.params;
  try {
    const result = await Post.findByIdAndDelete(post_id);
    const user = await User.findById({ _id: id });
    const datas = user.posts.filter((postId) => postId != post_id);
    user.posts = [...datas];
    await user.save();
    const data = await User.findById({ _id: id }).select("posts");
    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};
export default post_delete;
