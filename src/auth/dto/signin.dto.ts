import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "admin@gmail.com",
    description: "Admin emaili",
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: "admin1235",
    description: "Admin password kiritish kerak",
  })
  @IsString()
  readonly password: string;
}
