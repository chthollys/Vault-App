import { IsString } from "class-validator";

export class CreateCartItemDto {
  @IsString()
  gameId: string;
}
