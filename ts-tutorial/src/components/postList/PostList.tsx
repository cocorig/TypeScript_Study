import React from "react";
import PostCard from "../postCard/PostCard";
import { PostProps } from "@/types/PostProps.type";

///  { id: number; title: string; body: string };
async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PostList = async () => {
  const data: PostProps[] = await getData(); /// 받아온 데이터의 타입을 지정해 data에 할당
  return (
    <div className="postList">
      {data.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
