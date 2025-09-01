import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: { id: string } } // context must be typed like this
) {
  const { id } = context.params;

  try {
    // Your deletion logic here
    return NextResponse.json({ message: `School ${id} deleted successfully.` });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete school" }, { status: 500 });
  }
}
