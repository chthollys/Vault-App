-- CreateEnum
CREATE TYPE "public"."GameStatus" AS ENUM ('NORMAL', 'FEATURED', 'RECOMMENDED', 'TRENDING');

-- CreateEnum
CREATE TYPE "public"."RecommendationType" AS ENUM ('SIMILAR', 'NEW_RELEASE', 'POPULAR', 'CUSTOM');

-- DropIndex
DROP INDEX "public"."idx_game_releasedate";

-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "status" "public"."GameStatus" NOT NULL DEFAULT 'NORMAL';

-- CreateTable
CREATE TABLE "public"."FeaturedGame" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeaturedGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecommendedGame" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "recommendationType" "public"."RecommendationType" NOT NULL,
    "relatedGameId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendedGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_featuredgame_gameid" ON "public"."FeaturedGame"("gameId");

-- CreateIndex
CREATE INDEX "idx_featuredgame_startdate" ON "public"."FeaturedGame"("startDate");

-- CreateIndex
CREATE INDEX "idx_featuredgame_enddate" ON "public"."FeaturedGame"("endDate");

-- CreateIndex
CREATE INDEX "idx_recommendedgame_gameid" ON "public"."RecommendedGame"("gameId");

-- CreateIndex
CREATE INDEX "idx_recommendedgame_type" ON "public"."RecommendedGame"("recommendationType");

-- CreateIndex
CREATE INDEX "idx_recommendedgame_startdate" ON "public"."RecommendedGame"("startDate");

-- CreateIndex
CREATE INDEX "idx_game_status" ON "public"."Game"("status");

-- AddForeignKey
ALTER TABLE "public"."FeaturedGame" ADD CONSTRAINT "FeaturedGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendedGame" ADD CONSTRAINT "RecommendedGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecommendedGame" ADD CONSTRAINT "RecommendedGame_relatedGameId_fkey" FOREIGN KEY ("relatedGameId") REFERENCES "public"."Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
