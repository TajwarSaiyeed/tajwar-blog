import becrypt from "bcryptjs";
import { User } from "@/Models/Register";
import { connectDB } from "@/libs/MongoConnect";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      // const salt = await becrypt.hashSync(password, 10);
      const salt = await becrypt.hashSync(password, 10);

      const result = await User.create({
        username,
        password: salt,
      });

      const userDoc = await User.findOne({ username });
      if (!userDoc) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      } else {
        const passOk = becrypt.compareSync(password, userDoc.password);
        if (passOk) {
          const token = await new Promise((resolve, reject) => {
            jwt.sign(
              { username, id: userDoc._id },
              process.env.JWT_SECRET,
              { expiresIn: "1d" },
              (err, token) => {
                if (err) reject(err);
                resolve(token);
              }
            );
          });

          setCookie("token", token, {
            req,
            res,
            maxAge: 60 * 60 * 24,
          });

          return res
            .status(200)
            .json({ id: userDoc?._id, username: userDoc?.username });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
