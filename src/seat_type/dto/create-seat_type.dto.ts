import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSeatTypeDto {
  @ApiProperty({
    description: "O'rindiq turi nomi",
    example: "VIP",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
