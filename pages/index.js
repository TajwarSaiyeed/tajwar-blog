import PostCard from "@/components/PostCard/PostCard";
import Head from "next/head";

const Home = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="py-4 px-10 grid grid-cols-1  gap-2">
        {posts?.length > 0 &&
          posts?.map((post) => <PostCard key={post?._id} {...post} />)}
      </div>
    </>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch("https://tajwar-blog.vercel.app/api/post");
  const posts = await res.json();

  return {
    posts,
  };
};

export default Home;
