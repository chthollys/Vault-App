import db from "~/prisma/db";

export async function GET(request: Request) {
  const response = await db.game.findMany({});
}
