import db from "@/lib/prisma";

export async function GET() {
  const data = await db.tag.findMany();
  return Response.json({
    status: "200",
    data,
    message: "this is api route for get post",
  });
}
