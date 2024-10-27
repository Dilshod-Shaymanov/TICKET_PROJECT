import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateCustomerCardDto {
  @ApiProperty({
    example: "HAMKORBANK",
    description: "Mijozning kartasi uchun nomi",
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Mijozning telefon raqami.",
    maxLength: 15,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone: string;

  @ApiProperty({
    example: "9862 3363 2225 6652",
    description: "Mijozning kartasi raqami.",
    minLength: 16,
    maxLength: 19,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(16)
  @MaxLength(19)
  card_number: string;

  @ApiProperty({
    example: "2025",
    description: "Kartani tugash yili.",
    minLength: 2,
    maxLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(4)
  year: string;

  @ApiProperty({
    example: "12",
    description: "Kartani tugatish oyi.",
    minLength: 2,
    maxLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  month: string;

  @ApiProperty({
    example: true,
    description: "Kartaning aktivligi.",
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Bu kartani asosiy kartaga belgilash.",
  })
  @IsBoolean()
  is_main: boolean;
}
