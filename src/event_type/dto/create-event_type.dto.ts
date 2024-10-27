import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateEventTypeDto {
  @ApiProperty({
    example: "sport",
    description: "Tadbir turi nomi",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 1,
    description: "Ota tadbir turi ID'si, agar mavjud bo'lsa",
  })
  @IsOptional()
  @IsInt()
  parent_event_type_id?: number;
}
