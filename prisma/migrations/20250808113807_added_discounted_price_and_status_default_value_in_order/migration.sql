-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "discountedPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Profile" ALTER COLUMN "avatarUrl" SET DEFAULT 'https://vault-app-bucket.s3.ap-southeast-2.amazonaws.com/default-cover/user-default.jpg';
