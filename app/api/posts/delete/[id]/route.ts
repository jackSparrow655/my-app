import db from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const postData = await db.post.delete({
      where: { id: postId },
    });

    if (!postData) {
      return Response.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deletting post:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
