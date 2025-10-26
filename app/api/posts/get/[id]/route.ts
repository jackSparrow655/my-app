import db from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const postData = await db.post.findUnique({
      where: { id: postId },
    });

    if (!postData) {
      return Response.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }
    const tagId = postData.tagId;
    const tagDetails = await db.tag.findUnique({
      where: {
        id: tagId,
      },
    });
    if (!tagDetails) {
      return Response.json(
        { success: false, message: "Tag not found for that post" },
        { status: 404 }
      );
    }

    const postDetails = {
      ...postData,
      tagName: tagDetails?.name,
    };

    return Response.json({ success: true, post: postDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
