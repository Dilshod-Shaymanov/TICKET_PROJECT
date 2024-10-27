import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ActivateUserDto {
  @ApiProperty({
    example: 1,
    description: "User id kiritish kerak",
  })
  @IsNumber()
  readonly userId: number;
}
