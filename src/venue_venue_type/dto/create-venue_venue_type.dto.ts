import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVenueVenueTypeDto {
  @ApiProperty({
    description: "Venue unikal identifikatori",
    example: 1,
  })
  @IsNumber()
  venueId: number;

  @ApiProperty({
    description: "Venue turi unikal identifikatori",
    example: 2,
  })
  @IsNumber()
  venue_typeId: number;
}
