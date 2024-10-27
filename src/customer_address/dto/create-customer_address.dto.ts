import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateCustomerAddressDto {
  @ApiProperty({
    example: "Bobur",
    description: "Mijoz manzilining nomi",
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: "Bahor ko'chasi",
    description: "Mijoz manzilining ko'chasi",
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  street: string;

  @ApiProperty({
    example: "12",
    description: "Mijoz manzilining uyi",
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  house: string;

  @ApiProperty({
    example: 5,
    description: "Mijoz manzilidagi kvartira raqami",
  })
  @IsNumber()
  flat: number;

  @ApiProperty({
    example: "Toshkent",
    description: "Mijoz manzilining joylashuvi",
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location: string;

  @ApiProperty({
    example: "100000",
    description: "Mijoz manzilining pochta indeksi",
    minLength: 5,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  post_index: string;

  @ApiProperty({
    example: "Qo'shimcha ma'lumotlar",
    description: "Qo'shimcha ma'lumotlar (ixtiyoriy)",
    maxLength: 200,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  info?: string;
}
