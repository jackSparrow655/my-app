import db from "@/lib/prisma";
import z from "zod";

const tagSchema = z.object({
  name: z.string().min(1).max(32),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = tagSchema.parse(body);

    await db.tag.create({ data });

    return Response.json(
      { success: true, message: "Tag created successfully" },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: err,
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: false,
        message: "Something went wrong on the server",
      },
      { status: 500 }
    );
  }
}
