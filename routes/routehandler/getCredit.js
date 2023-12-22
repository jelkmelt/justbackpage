import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";

export const get_credit = async (req, res) => {
  const id = req.user._id.toString();

  try {
    const user = await User.findById({ _id: id });
    if (user) {
      return res.status(200).json({ credit: user.credit });
    }

    return res.status(400).json({ error: "something wrong" });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default get_credit;