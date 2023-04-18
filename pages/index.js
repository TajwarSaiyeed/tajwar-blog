import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard/PostCard";
import Head from "next/head";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/post`);
      const posts = await res.json();
      setLoading(false);
      setPosts(posts);
    };
    const refetchPosts = setTimeout(() => {
      setRefetch((prev) => !prev);
    }, 5000);

    return () => {
      clearTimeout(refetchPosts);
      getPosts();
    };
  }, [refetch]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="py-4 px-10 grid grid-cols-1  gap-2">
        {loading && <h1>Loading...</h1>}
        {posts?.length > 0 &&
          posts?.map((post) => <PostCard key={post?._id} {...post} />)}
      </div>
    </>
  );
};

export default Home;
