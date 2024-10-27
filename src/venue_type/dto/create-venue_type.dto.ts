import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVenueTypeDto {
  @ApiProperty({
    example:"Bunyodkor",
    description:"Joy turini nomi"
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
