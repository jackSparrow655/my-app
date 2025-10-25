"use client";
import PostInputform from "@/components/form/PostInputForm";
import { PostType } from "@/app/types";

const CreatePostPage = () => {
  const EditPostSubmitHandler = (data: PostType, reset: () => void) => {
    console.log("data = ", data);
    reset();
  };
  return (
    <div className="container flex-1 flex justify-center">
      <PostInputform
        formSubmitHandler={EditPostSubmitHandler}
        isEditForm={true}
      />
    </div>
  );
};

export default CreatePostPage;
