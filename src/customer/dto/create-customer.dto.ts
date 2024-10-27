import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  isEnum,
} from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({
    example: "John",
    description: "Mijozning ismi",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "Mijozning familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  last_name: string;

  @ApiProperty({
    example: "John@gmail.com",
    description: "Mijozning emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "+998 93 126 22 36",
    description: "Mijozning phone",
  })
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({
    example: "2003-02-02",
    description: "Mijozning tug'ilgan sanasi",
  })
  @IsString()
  birth_date: Date;

  @ApiProperty({
    example: "erkak",
    description: "Mijozning jinsi",
    enum: ["erkak", "ayol"],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(["erkak", "ayol"])
  gender: string;

  @ApiProperty({
    example: "afdsdfsa.165451qrewfwqrq2341!#@",
    description: "Mijoz refresh token",
  })
  hashed_refresh_token?: string;

  @ApiProperty({
    example: "john1236",
    description: "Mijozning passwordi",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(26)
  @IsAlphanumeric()
  password: string;
}
