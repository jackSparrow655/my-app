"use client";
import PostInputform from "@/components/form/PostInputForm";
import { PostType } from "@/app/types";

const CreatePostPage = () => {
  const EditPostSubmitHandler = (data: PostType) => {
    console.log("data = ", data);
  };

  return (
    <div className="container min-h-screen flex justify-center">
      <PostInputform
        formSubmitHandler={EditPostSubmitHandler}
        isEditForm={true}
      />
    </div>
  );
};

export default CreatePostPage;
