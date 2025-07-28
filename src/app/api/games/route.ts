import { NextResponse } from "next/server";
import db from "~/prisma/db";

export async function GET() {
  try {
    const response = await db.game.findMany({});
    if (!response) {
      return NextResponse.json(
        { error: "Games aren't available" },
        { status: 404 }
      );
    }
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
