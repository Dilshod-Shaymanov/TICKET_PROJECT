import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Seat } from "./models/seat.model";

@ApiTags("O'rindiqlar")
@Controller("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}
  @ApiOperation({ summary: "Yangi o'rindiq yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi o'rindiq muvaffaqiyatli yaratildi",
    type: Seat,
  })
  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @ApiOperation({ summary: "Barcha o'rindiqlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha o'rindiqlar ro'yxati",
    type: [Seat],
  })
  @Get()
  findAll() {
    return this.seatService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha o'rindiqni olish" })
  @ApiResponse({
    status: 200,
    description: "ID bo'yicha o'rindiq topildi",
    type: Seat,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seatService.findOne(+id);
  }

  @ApiOperation({ summary: "ID bo'yicha o'rindiqni yangilash" })
  @ApiResponse({
    status: 200,
    description: "O'rindiq muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(+id, updateSeatDto);
  }

  @ApiOperation({ summary: "ID bo'yicha o'rindiqni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'rindiq muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seatService.remove(+id);
  }
}
