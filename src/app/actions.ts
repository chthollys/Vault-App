"use server";

import db from "~/prisma/db";

export async function getGames() {
  try {
    const response = await db.game.findMany({});
    return response;
  } catch (error) {
    console.log("Failed to fetch games: ", error);
    throw error;
  }
}

export async function getRating() {}
