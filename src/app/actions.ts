"use server";

import db from "~/prisma/db";

export async function getGames() {
  const response = await db.game.findMany({});
  return response;
}
