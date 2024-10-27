import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { SeatTypeService } from "./seat_type.service";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SeatType } from "./models/seat-type.model";
@ApiTags("O'rindiq turi")
@Controller("seat-type")
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @ApiOperation({ summary: "O'rindiq turi yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yaratilgan joy turi",
    type: SeatType,
  })
  @Post()
  async createSeatType(@Body() createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeService.createSeatType(createSeatTypeDto);
  }

  @ApiOperation({ summary: "Barcha o'rindiq turlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha o'rindiqlar ro'yxati",
    type: [SeatType],
  })
  @Get()
  async getAllSeatTypes() {
    return this.seatTypeService.getAllSeatTypes();
  }

  @ApiOperation({ summary: "Bitta o'rindiq turini ID si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "O'rindiq turi topildi",
    type: SeatType,
  })
  @Get(":id")
  async getSeatTypeById(@Param("id") id: number) {
    return this.seatTypeService.getSeatTypeById(id);
  }

  @ApiOperation({ summary: "Bitta o'rindiq turini ID si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'rindiq turi o'chirildi",
  })
  @Delete(":id")
  async deleteSeatTypeById(@Param("id") id: number) {
    return this.seatTypeService.deleteSeatTypeById(id);
  }
  @ApiOperation({ summary: "Bitta o'rindiq turini ID si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "O'rindiq turi yangilandi",
    type: SeatType,
  })
  @Patch(":id")
  async updateSeatTypeById(
    @Param("id") id: number,
    @Body()
    updateSeatTypeDto: UpdateSeatTypeDto
  ) {
    return this.seatTypeService.updateSeatTypeById(id, updateSeatTypeDto);
  }
}
