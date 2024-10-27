import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDateString } from "class-validator";

export class CreateCartDto {
  @ApiProperty({
    example: 1,
    description: "Biletning unikal identifikatori",
  })
  @IsNumber()
  ticketId: number;

  @ApiProperty({
    example: 1,
    description: "Mijozning unikal identifikatori",
  })
  @IsNumber()
  customerId: number;

  @ApiProperty({
    example: 1,
    description: "Savat holati uchun unikal identifikator",
  })
  @IsNumber()
  cart_statusId: number;

  @ApiProperty({
    example: "2024-09-30",
    description: "Savatni tugatish sanasi (YYYY-MM-DD formatida)",
  })
  @IsDateString()
  finishedAt: Date;
}
