import { connectDB } from "@/libs/MongoConnect";
import { Post } from "@/Models/Post";
import { User } from "@/Models/Register";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  await connectDB();
  const token = req.cookies.token;
  if (req.method === "POST") {
    const { title, summary, content, image } = req.body;
    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    try {
      const post = await Post.create({
        title,
        summary,
        image,
        content,
        author: user?.id,
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET" && req.query.id) {
    const id = req.query.id;
    try {
      const post = await Post.findById(id).populate(
        "author",
        ["username"],
        User
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET" && req.query.userId) {
    const userId = req.query.userId;
    try {
      const posts = await Post.find({ author: userId })
        .populate("author", ["username"], User)
        .sort({ createdAt: -1 })
        .limit(10);
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    const { title, summary, content, image } = req.body;
    const id = req.query.id;
    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    try {
      const postDoc = await Post.findById(id);
      if (JSON.stringify(postDoc.author) !== JSON.stringify(user.id)) {
        throw new Error("You are not authorized to edit this post");
      }

      const post = await Post.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          image,
          content,
        },
        { new: true }
      );

      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    const id = req.query.id;

    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
    try {
      const postDoc = await Post.findById(id);
      if (JSON.stringify(postDoc.author) !== JSON.stringify(user.id)) {
        throw new Error("You are not authorized to edit this post");
      }

      const post = await Post.findByIdAndDelete(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      const posts = await Post.find({})
        .populate("author", ["username"], User)
        .sort({ createdAt: -1 })
        .limit(10);

      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
