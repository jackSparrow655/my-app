"use client";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/shared/Card";
import axios from "axios";

const page = () => {
  const { data: cards } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const response = await axios.get("/api/posts/get-all");
      return response.data.data;
    },
  });

  return (
    <div className="container">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center py-5 md:py-10">
        {cards?.map((item: any, index: number) => (
          <Card key={index} cardData={item} />
        ))}
      </section>
    </div>
  );
};

export default page;
