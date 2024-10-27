import { IsNotEmpty, IsString, MaxLength, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({
    description: "Tadbirning nomi",
    example: "Konsert",
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: "Tadbirga tegishli rasm URL",
    example: "https://example.com/photo.jpg",
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    description: "Tadbirning boshlanish sanasi (YYYY-MM-DD formatida)",
    example: "2024-09-26",
  })
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    description: "Tadbirning boshlanish vaqti (HH:mm:ss formatida)",
    example: "14:00:00",
  })
  @IsString()
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({
    description: "Tadbirning tugash sanasi (YYYY-MM-DD formatida)",
    example: "2024-09-26",
  })
  @IsDateString()
  @IsNotEmpty()
  finish_date: Date;

  @ApiProperty({
    description: "Tadbirning tugash vaqti (HH:mm:ss formatida)",
    example: "16:00:00",
  })
  @IsString()
  @IsNotEmpty()
  finish_time: Date;

  @ApiProperty({
    description: "Tadbir haqida qo'shimcha ma'lumot",
    example: "Bu tadbirda mashhur san'atchilar qatnashadi.",
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  info: string;

  @ApiProperty({
    description: "Tadbirning chiqarilish sanasi (YYYY-MM-DD formatida)",
    example: "2024-09-01",
  })
  @IsDateString()
  @IsNotEmpty()
  realease_date: Date;
}
