import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

const PostCard = ({
  _id,
  title,
  summary,
  image,
  content,
  createdAt,
  author,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start duration-300 hover:bg-slate-100 justify-center gap- border-[1px] overflow-hidden rounded-lg">
      <Link
        href={`/post/${_id}`}
        className="w-full sm:w-1/2 h-[300px] overflow-hidden bg-red-200"
      >
        <Image
          className="max-w-full w-full h-full object-cover"
          width="100"
          height="100"
          src={image}
          alt="blog image"
        />
      </Link>
      <div className="w-full sm:w-1/2 flex flex-col py-2 px-4 sm:pr-4 sm:h-full">
        <Link
          href={`/post/${_id}`}
          className="text-sm md:text-[1.2rem]  text-justify font-semibold"
        >
          {title}
        </Link>
        <p className="mb-3 flex flex-wrap items-center gap-3">
          <span className="hover:underline text-lg text-blue-400">
            {author?.username}
          </span>
          <span className="text-sm">
            {format(new Date(createdAt), "MMMM dd, yyyy 'at' h:mm aaaa")}
          </span>
        </p>
        <p className="text-[14px] md:text-[16px] text-justify">
          {summary?.length > 150 ? summary?.slice(0, 150) + "..." : summary}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
