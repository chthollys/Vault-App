import { Review } from "@repo/types";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class ReviewDto implements Review {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty()
  @Expose()
  @IsString()
  gameId: string;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  createdAt: Date;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  @IsOptional()
  @IsString()
  comment: string | null;

  @ApiProperty({ type: Number })
  @Expose()
  @IsNumber()
  rating: number;
}
