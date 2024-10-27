import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRemoveRoleDto {
  @ApiProperty({
    example: 1,
    description: "User id kiritish kerak",
  })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({
    example: "USER",
    description: "Yangi qo'shiladigan role kiritish kerak",
  })
  @IsString()
  readonly role_value: string;
}
