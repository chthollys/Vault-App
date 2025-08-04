"use server";

import db from "~/prisma/db";
import bcrypt from "bcrypt";

export async function getUsers() {
  return await db.user.findMany({});
}

export async function getGames() {
  return await db.game.findMany({});
}

export async function getGame(id: string) {
  const response = await db.game.findUnique({
    where: {
      id,
    },
  });
  return response;
}
export async function getGenreByGameId(gameId: string) {
  const response = await db.gameGenre.findMany({
    where: {
      gameId,
    },
    select: {
      genre: true,
    },
  });
  return response;
}

export const saveUserPassword = async (
  userId: string,
  plainPassword: string
) => {
  const saltRounds = 13;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  const response = await db.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
  return response;
};

export const verifyPassword = async (
  userId: string,
  inputPassword: string
): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });
  if (!user) return false;
  return bcrypt.compare(inputPassword, user.password);
};
