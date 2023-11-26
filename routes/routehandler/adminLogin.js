import createToken from "../../utils/createToken.js";
import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import bcrypt from "bcryptjs";

export const admin_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = createToken(admin._id);
        return res.status(200).json({ token: token });
      }
      return res.status(400).json({ error: "wrong password" });
    }
    return res.status(400).json({ error: "not found" });
  } catch (e) {
    return res.status(400).json({ error: "something  wrong" });
  }
};

export default admin_login_post;
