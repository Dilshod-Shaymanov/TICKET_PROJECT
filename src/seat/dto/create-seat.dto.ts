import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSeatDto {
  @ApiProperty({
    example: "4-sector",
    description: "Sector nomi",
  })
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiProperty({
    example: 5,
    description: "Qator raqami (row_number)",
  })
  @IsNumber()
  @IsNotEmpty()
  row_number: number;

  @ApiProperty({
    example: 15,
    description: "O'rindiq raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    example: "Chap qanot, old",
    description: "O'rindiq joylashuvi (location)",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 2,
    description: "Venue unikal identifikatori",
  })
  @IsNumber()
  @IsNotEmpty()
  venueId: number;

  @ApiProperty({
    example: 3,
    description: "O'rindiq turi (seat_typeId)",
  })
  @IsNumber()
  @IsNotEmpty()
  seat_typeId: number;
}
