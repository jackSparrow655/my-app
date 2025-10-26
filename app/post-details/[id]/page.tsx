"use client";
import PostInputform from "@/components/form/PostInputForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { use, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export interface editPostDataType {
  title: string;
  description: string;
  tagId: string;
}

const PostDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: postId } = use(params);
  const queryClient = useQueryClient();
  const [editPostModalOpen, setEditPostModalOpen] = useState<boolean>(false);
  const [deletePostModalOpen, setDeletePostModalOpen] =
    useState<boolean>(false);
  const toggleEditPostModalOpen = () => {
    setEditPostModalOpen((prev) => {
      return !prev;
    });
  };
  const toggleDeleteModal = () => {
    setDeletePostModalOpen((prev) => {
      return !prev;
    });
  };

  const { data, isLoading:postFetchinLoading } = useQuery({
    queryKey: ["get-post", `${postId}`],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/get/${postId}`);
      return response.data;
    },
  });
  const { mutate: editMutate, isPending: editLoading } = useMutation({
    mutationFn: async (payload: editPostDataType) => {
      return axios.post(`/api/posts/edit/${postId}`, payload);
    },
  });
  const EditPostSubmitHandler = (data: editPostDataType) => {
    editMutate(data, {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["get-post", `${postId}`],
          }),
          queryClient.invalidateQueries({ queryKey: ["allPosts"] }),
        ]);
        setEditPostModalOpen(false);
      },
    });
  };

  const {
    mutate: deleteMutate,
    isPending: deleteLoading,
  } = useMutation({
    mutationFn: async () => {
      return axios.get(`/api/posts/delete/${postId}`);
    },
    onSuccess: () => {
      setDeletePostModalOpen(false);
      Promise.all([
        queryClient.removeQueries({ queryKey: ["get-post", postId] }),
        queryClient.invalidateQueries({ queryKey: ["allPosts"] }),
      ]);
    },
  });
  return (
    <div className="container pt-5 lg:pt-10 flex-1">
      {postFetchinLoading && <Skeleton className="min-h-44 w-full bg-gray-800"/>}
      {data?.post && (
        <>
          <Card className="bg-slate-800 text-gray-300 border-none">
            <CardHeader className="flex gap-10">
              <p className="text-gray-200 max-w-[70%]">{data?.post?.title}</p>
              <Badge className="text-black bg-yellow-500">
                {data?.post?.tagName}
              </Badge>
            </CardHeader>
            <CardContent>
              <p>{data?.post?.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button
                onClick={toggleEditPostModalOpen}
                className="py-5 bg-pink-700 text-black hover:bg-pink-800 cursor-pointer"
              >
                Edit
              </Button>
              <AlertDialog
                open={deletePostModalOpen}
                onOpenChange={setDeletePostModalOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button className="py-5 bg-red-500 text-black hover:bg-pink-800 cursor-pointer">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      This action cannot be undone. This will permanently delete
                      your post and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button
                      onClick={toggleDeleteModal}
                      className="bg-sky-500 border-none text-black hover:bg-sky-600 cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        deleteMutate();
                      }}
                      className="bg-red-500 text-black hover:bg-red-600 cursor-pointer"
                    >
                      {deleteLoading ? "Deletting..." : "Confirm"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
          <Dialog open={editPostModalOpen} onOpenChange={setEditPostModalOpen}>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Post edit form</DialogTitle>
              </DialogHeader>
              <PostInputform
                formSubmitHandler={EditPostSubmitHandler}
                isEditForm={true}
                postDetails={data?.post}
                loading={editLoading}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default PostDetailsPage;
