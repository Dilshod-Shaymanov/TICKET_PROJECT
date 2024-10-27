import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "Admin", description: "Bu yerda rollar kiritiladi" })
  @IsString({ message: "string bo'lish kerak" })
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: "Admin role malumotlari",
    description: "Bu yerda rol bo'yicha to'liq malumot kiritiladi",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
