"use client";

import PostInputform from "@/components/form/PostInputForm";
import { PostType } from "../types";

const CreatePostPage = () => {
  const createPostFormSubmitHandler = (data: PostType, reset:()=>void) => {
    console.log("data = ", data);
    reset()
  };

  return (
    <div className="container min-h-screen flex justify-center">
      <PostInputform formSubmitHandler={createPostFormSubmitHandler} />
    </div>
  );
};

export default CreatePostPage;
