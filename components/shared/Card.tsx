import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostType } from "@/app/types";

const PostCard = ({ cardData }: { cardData: PostType }) => {
  return (
    <Card className="max-w-96 bg-gray-800 border-none text-gray-200 flex flex-col gap-2 py-5">
      <CardHeader>
        <CardTitle>{cardData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{cardData.description.slice(12)}</p>
      </CardContent>
      <CardFooter className="flex justify-end mt-2">
        <Link href="/post-details/1">
          <Button className="cursor-pointer">See more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
