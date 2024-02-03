import React from "react";
import { PostProps } from "@/types/PostProps.type";

export default function PostCard({ title, body }: PostProps) {
  //title, body-> prop 타입도 지정해야함
  return (
    <div className="postCard">
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}
