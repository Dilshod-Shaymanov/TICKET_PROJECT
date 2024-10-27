import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateDistrictDto {
  @ApiProperty({
    example: "Samarqand",
    description: "Tuman nomi",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
  @ApiProperty({
    example: 1,
    description: "Tuman joylashgan viloyatning identifikatori",
  })
  @IsNumber()
  regionId: number;
}
