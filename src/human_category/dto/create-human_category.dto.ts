import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateHumanCategoryDto {
  @ApiProperty({
    example: "Bolalar",
    description: "Inson toifasinig nomi",
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 5,
    description: "Inson toifasidagi eng kichik yosh",
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  start_age: number;

  @ApiProperty({
    example: 12,
    description: "Inson toifasidagi eng katta yosh",
    minimum: 0,
    maximum: 120,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(120)
  finish_age: number;

  @ApiProperty({
    example: 1,
    description: "Jinsi: 1 - erkak, 2 - ayol",
    enum: [1, 2],
  })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  gender: number;
}
