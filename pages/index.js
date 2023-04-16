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

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/post");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
