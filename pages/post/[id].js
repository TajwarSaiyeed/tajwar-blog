import Loading from "@/components/Loading";
import { useUser } from "@/context/UserContext";
import { format } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { user } = useUser();
  const [authorPosts, setAuthorPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/post?id=${router.query.id}`);
      const data = await res.json();
      setPost(data);
    };
    return () => getPost();
  }, []);

  console.log("post", post);

  useEffect(() => {
    if (!post) {
      return;
    }

    const allPost = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/post?userId=${post?.author?._id}`);
      const posts = await res.json();
      setAuthorPosts(posts);
      setIsLoading(false);
    };
    return () => allPost();
  }, [post]);

  const hanldeDelete = async (id) => {
    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/post?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      console.log("data", data);
      setDeleteLoading(false);
      setRedirect(true);
      alert("Post deleted successfully");
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!post) return <Loading />;

  if (redirect) {
    router.push("/");
  }

  if (!post) {
    return (
      <div className="w-full flex flex-col md:flex-row gap-5 center py-3">
        <div className="flex flex-col gap-4 w-full px-2">
          <h1 className="text-[40px] font-bold text-center">Post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <div className="w-full flex flex-col md:flex-row gap-5 center py-3">
        <div className="md:w-4/6 flex flex-col gap-4 w-full px-2">
          <h1 className="text-[40px] font-bold">{post?.title}</h1>
          <div className="my-3 flex flex-wrap justify-between items-center p-3">
            <p className="font-semibold hover:underline hover:text-gray-600 duration-150">
              by {post?.author?.username}
            </p>
            <p>
              {format(
                new Date(post?.createdAt),
                "MMMM dd, yyyy 'at' h:mm aaaa"
              )}
            </p>
          </div>
          <div className="w-full h-96 flex justify-center items-center overflow-hidden">
            <Image
              className="min-w-96 w-full h-96 object-contain"
              width="100"
              height="100"
              src={post?.image}
              alt="blog image"
            />
          </div>
          <div className="flex justify-center items-center w-full">
            {user?.id === post?.author?._id && (
              <>
                <Link
                  href={`/edit/${post?._id}`}
                  className="bg-slate-700 text-white hover:text-slate-700 hover:bg-slate-100 duration-150 px-3 py-2 rounded-md "
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => hanldeDelete(post?._id)}
                  className="font-semibold md:text-lg link link-hover uppercase border px-4 py-2 rounded-md bg-red-500 text-[#fafafa] hover:text-white hover:bg-red-900 duration-300"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </>
            )}
          </div>
          <div>
            <p className="text-center font-bold text-xl">{post?.summary}</p>
            <div
              className="py-4"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 md:w-2/6 lg:px-5">
          <h1 className="bg-slate-200 w-full px-3 py-2">
            {post?.author?.username} other posts
          </h1>
          <div className="flex flex-col">
            {isLoading ? (
              <Loading />
            ) : (
              authorPosts?.map((post) => (
                <Link
                  className="bg-slate-100 hover:bg-slate-50 duration-150 px-3 py-2 w-full border-b-[1px]"
                  key={post._id}
                  href={`/post/${post?._id}`}
                >
                  {post?.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
