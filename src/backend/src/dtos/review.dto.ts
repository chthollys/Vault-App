import { Review } from "@repo/types";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
export class ReviewDto implements Review {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  userId: string;

  @Expose()
  @IsString()
  gameId: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsOptional()
  @IsString()
  comment: string | null;

  @Expose()
  @IsNumber()
  rating: number;
}
