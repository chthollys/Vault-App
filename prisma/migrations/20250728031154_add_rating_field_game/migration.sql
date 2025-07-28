-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
