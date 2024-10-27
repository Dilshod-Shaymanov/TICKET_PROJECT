import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "User1",
    description: "Foydalanuvchi ismi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchi email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description:
      "Foydalanuvchi passwordi (Strong password: katta harf, kichik harf symbol number",
  })
  // @IsStrongPassword()
  @IsString()
  password: string;

  @ApiProperty({
    example: "USER",
    description: "Foydalanuvchiga berilayotgan dastlabki role",
  })
  @IsString()
  @IsNotEmpty()
  role_value: string;
}
