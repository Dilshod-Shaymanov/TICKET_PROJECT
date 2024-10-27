import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLanguageDto {
  @ApiProperty({
    example: "English",
    description: "Til nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
