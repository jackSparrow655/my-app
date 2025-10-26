"use client";

import PostInputform from "@/components/form/PostInputForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { editPostDataType } from "../post-details/[id]/page";

const CreatePostPage = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending: createPostLoading } = useMutation({
    mutationFn: (postData: editPostDataType) => {
      return axios.post("/api/posts/create", postData);
    },
  });

  const createPostFormSubmitHandler = (
    data: editPostDataType,
    reset: () => void
  ) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      },
    });
  };

  return (
    <div className="container flex-1 flex justify-center">
      <PostInputform
        formSubmitHandler={createPostFormSubmitHandler}
        loading={createPostLoading}
      />
    </div>
  );
};

export default CreatePostPage;
