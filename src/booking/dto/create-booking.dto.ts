import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({
    example: "2021-02-02",
    description: "Oxirigi sanasi",
  })
  @IsString()
  finishedAt: Date;

  @ApiProperty({
    example: 1,
    description: "cart id",
  })
  cartId: number;

  @ApiProperty({
    example: 1,
    description: "booking status id",
  })
  booking_statusId: number;
}
