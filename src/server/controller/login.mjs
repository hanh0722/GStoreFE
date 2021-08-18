import db from "../db/db.mjs";
import bcrypt from "bcrypt";
const Login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || !email.includes("@")) {
    return res.status(400).json("not valid");
  }
  db.select("*")
    .from("login")
    .where("username", "=", email)
    .returning("*")
    .then((data) => {
      const passwordSync = bcrypt.compareSync(password, data[0].password);
      if (!passwordSync) {
        res.status(400).json("not valid!");
      } else {
        res.json(data[0]);
      }
    })
    .catch((err) => res.json(err));
};

export default Login;
