import jwt from "jsonwebtoken";
import Admin from "../database/models/Admin.js";

const jwtKey = process.env.JWT_KEY;
const checkAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("You must Be logged in");
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtKey, async (err, payload) => {
    if (err) {
      return res.status(401).send(authorization);
    }

    const { id } = payload;
    const user = await Admin.findById(id);
    req.user = user;

    console.log(req.user);
    next();
  });
};

export default checkAdmin;
