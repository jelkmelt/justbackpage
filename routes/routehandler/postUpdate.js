import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";
export const post_update = async (req, res) => {
  const id = req.user._id.toString();
  const { post_id } = req.params;
  const {
    title,
    description,
    age,
    email,
    number,
    postType,
    images,
    category,
    section,
    country,
    state,
    city,
    placed,
    preminum,
    highlighted,
    cost,
  } = req.body;
  try {
    const result = await Post.findOneAndUpdate(
      { _id: post_id },
      {
        title,
        description,
        age,
        email,
        number,
        postType,
        images,
        category,
        section,
        country,
        state,
        city,
        placed,
        preminum,
        highlighted,
        cost,
      },
      { new: true },
    );
    return res.status(200).json({ success: "updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default post_update;
