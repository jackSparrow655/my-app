import db from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const body = await request.json();
    console.log("body = ", body);

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: body,
    });

    if (!updatedPost) {
      return Response.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
