import createToken from "../../utils/createToken.js";
import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import bcrypt from "bcryptjs";

export const admin_signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      return res.status(400).json({ status: "Already exists" });
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const userCreated = await Admin.create({
      email,
      password: hashed_password,
    });
    return res.status(200).json({ user: "success" });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default admin_signup_post;
