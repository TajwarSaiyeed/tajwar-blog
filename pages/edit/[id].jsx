import React, { useState } from "react";
import Loading from "@/components/Loading";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import Editor from "@/components/Editor/Editor";
import Head from "next/head";

const EditPost = ({ post }) => {
  const { user, loading } = useUser();
  const [title, setTitle] = useState(post?.title);
  const [summary, setSummary] = useState(post?.summary);
  const [content, setContent] = useState(post?.content);
  const [image, setImage] = useState(post?.image);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !summary || !content || !image) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const post = {
        title,
        summary,
        content,
        image: reader.result,
      };
      try {
        const res = await fetch(`/api/post?id=${router.query.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(post),
        });

        if (!res.ok) {
          throw new Error(await res.text());
        } else {
          setTitle("");
          setSummary("");
          setContent("");
          setImage(null);
          setRedirect(true);
        }

        const data = await res.json();

        alert("Post updated successfully");
      } catch (error) {
        console.log(error);
      }
    };
  };

  if (loading) return <Loading />;

  if (!user) {
    router.push("/login");
  }

  if (redirect) {
    router.push("/");
  }

  if (!post) {
    return <h1 className="text-2xl text-center">Post not found</h1>;
  }
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <form onSubmit={handleUpdate} className="w-full px-10 my-5 mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="summary"
            className="block text-gray-700 font-bold mb-2"
          >
            Summary
          </label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={summary}
            placeholder="Enter summary"
            onChange={(e) => setSummary(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>

          <Editor value={content} onChange={(e) => setContent(e)} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full md:w-[150px] rounded focus:outline-none focus:shadow-outline"
        >
          Update Post
        </button>
      </form>
    </>
  );
};

export const getStaticProps = async (context) => {
  const { id } = context?.params;
  const res = await fetch(`http://localhost:3000/api/post?id=${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/post");
  const posts = await res.json();

  const paths = posts?.map((post) => ({
    params: { id: post?._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default EditPost;
