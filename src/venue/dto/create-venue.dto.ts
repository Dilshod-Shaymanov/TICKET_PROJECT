import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsPhoneNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVenueDto {
  @ApiProperty({
    description: "Venue nomi",
    example: "Grand Hall",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Venue manzili",
    example: "123 Main St",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: "Venue joylashuvi",
    example: "City Center",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: "Venue veb-sayti (ixtiyoriy)",
    example: "https://www.grandhall.com",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  site?: string;

  @ApiProperty({
    description: "Venue telefon raqami (ixtiyoriy)",
    example: "+1234567890",
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber(null)
  phone?: string;

  @ApiProperty({
    description: "Venue sxemasi",
    example: ["Main Hall", "Conference Room"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  schema: string[];
}
