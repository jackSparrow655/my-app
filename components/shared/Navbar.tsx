import { Button } from "@/components/ui/button";
import { BookOpenCheck } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="py-4 shadow-sm">
      <section className="container flex ">
        <div className="flex-1">
          <Link href="/">
            <BookOpenCheck className="text-pink-500" />
          </Link>
        </div>
        <div className="flex-none">
          <Link href="/create-post">
            <Button className="py-5 bg-pink-700 text-black hover:bg-pink-800">
              Create Post
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
