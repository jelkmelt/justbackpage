import createToken from "../../utils/createToken.js";
import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";

export const user_login_post = async (req, res) => {
  const { email, name, image, role, LOGIN_SECRET } = req.body;
  // return res.status(200).json({ status: "success"})

  try {
    if (process.env.LOGIN_SECRET == LOGIN_SECRET) {
      const userFound = await User.findOne({ email: email });
      if (userFound) {
        const token = createToken(userFound._id);
        return res.status(200).json({ status: "success", token });
      }
      const userCreated = await User.create({
        email,
        name,
        image,
        role,
      });
      const token = createToken(userCreated._id);
      return res.status(200).json({ status: "success", token });
    }
    return res.status(400).json({ error: "invalid" });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default user_login_post;
