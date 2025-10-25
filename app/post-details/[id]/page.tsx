import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

const PostDetailsPage = () => {
  const postDetails = {
    title: "Post title",
    description:
      "digambarpur east nabin chandra high school, debnagar mokshoda dinda higher secondary school",
    tag: "react",
  };
  return (
    <div className="container pt-5 lg:pt-10 flex-1">
      <Card className="bg-slate-800 text-gray-300">
        <CardHeader className="flex gap-10">
          <p className="text-gray-200 max-w-[70%]">{postDetails.title}</p>
          <Badge className="text-black bg-yellow-500">{postDetails.tag}</Badge>
        </CardHeader>
        <CardContent>
          <p>{postDetails.description}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link href='/edit-post/1'>
            <Button
              type="submit"
              form="form-rhf-demo"
              className="py-5 bg-pink-700 text-black hover:bg-pink-800 cursor-pointer"
            >
              Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostDetailsPage;
