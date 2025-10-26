import db from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("request.body = ", body);
  await db.post.create({ data: body });

  return Response.json({
    success: true,
    status: 200,
  });
}
