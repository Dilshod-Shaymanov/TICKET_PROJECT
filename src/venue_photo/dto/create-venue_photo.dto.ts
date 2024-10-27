import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateVenuePhotoDto {
  @ApiProperty({
    example: "static/mountain.jpg",
    description: "Rasm urli",
  })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({
    example: 1,
    description: "Unikal venue id ",
  })
  @IsNumber()
  @Type(() => Number)
  venueId: number;
}
