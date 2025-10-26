"use client";

import PostInputform from "@/components/form/PostInputForm";
import { PostType } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CreatePostPage = () => {
  const queryClient = useQueryClient()
  
  const { mutate } = useMutation({
    mutationFn: (postData: PostType) => {
      return axios.post("/api/posts/create", postData);
    },
  });

  const createPostFormSubmitHandler = (data: PostType, reset: () => void) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({queryKey:['allPosts']})
      },
    });
  };

  return (
    <div className="container flex-1 flex justify-center">
      <PostInputform formSubmitHandler={createPostFormSubmitHandler} />
    </div>
  );
};

export default CreatePostPage;
