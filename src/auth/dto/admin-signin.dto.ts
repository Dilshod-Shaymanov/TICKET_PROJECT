import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AdminSignInDto {
  @ApiProperty({
    example: "Abdukarim",
    description: "Login kiritish kerak",
  })
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({
    example: "12365sha",
    description: "Admin passwordi kiritish kerak",
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
