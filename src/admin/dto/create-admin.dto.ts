import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
export class CreateAdminDto {
  @ApiProperty({
    example: "Bobur",
    description: "Admin ismi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Bobur@gmail.com",
    description: "Admin emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Bobur1234",
    description:
      "Admin passwordi (raqam va hardan iborat bo'lish kerak)",
  })
  @IsString()
  @IsAlphanumeric()
  password: string;

  @ApiProperty({
    example: false,
    description: "Admin creator yoki yo'q",
  })
  @IsBoolean()
  @IsOptional()
  is_creator: boolean;

  @ApiProperty({
    example: true,
    description: "Admin activligi",
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty({
    example: "BoburLogin",
    description: "Admin login",
  })
  @IsString()
  @IsNotEmpty()
  login: string;
}
