import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTicketDto {
  @ApiProperty({
    example: "Yuqori sifatli xizmat uchun",
    description: "Xizmat turi uchun bepul yoki boshqa xizmat haqi",
  })
  @IsString()
  @IsNotEmpty()
  service_free: string;

  @ApiProperty({
    example: 25000,
    description: "Chipta narxi",
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 1,
    description: "Chipta turi (raqam bilan ifodalanadi)",
  })
  @IsNumber()
  ticket_type: number;
}
