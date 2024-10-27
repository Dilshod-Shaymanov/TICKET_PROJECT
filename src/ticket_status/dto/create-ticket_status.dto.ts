import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketStatusDto {
  @ApiProperty({
    example: "active",
    description: "Chipta holati nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
