import jwt from "jsonwebtoken";
import { deleteCookie } from "cookies-next";
export default async function handler(req, res) {
  const token = req.cookies.token;
  if (req.method === "GET") {
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      try {
        const user = await new Promise((resolve, reject) => {
          jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
          });
        });

        res.status(200).json({ user });
      } catch (error) {
        res.status(400).json(error);
      }
    }
  } else if (req.method === "POST") {
    try {
      deleteCookie("token", { req, res });
      res.status(200).json({ message: "Logout success" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
