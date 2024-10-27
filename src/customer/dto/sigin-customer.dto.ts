import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsString } from "class-validator";

export class SigInCustomerDto {
  @ApiProperty({
    example: "John@gmail.com",
    description: "Mijozning emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "John1235",
    description: "Mijozning password",
  })
  @IsString()
  @IsAlphanumeric()
  password: string;
}
