import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookingStatusService } from "./booking_status.service";
import { CreateBookingStatusDto } from "./dto/create-booking_status.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking_status.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookingStatus } from "./models/booking_status.model";

@ApiTags("Buyurtma holati")
@Controller("booking-status")
export class BookingStatusController {
  constructor(private readonly bookingStatusService: BookingStatusService) {}

  @ApiOperation({ summary: "Buyurtma statusini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Buyurtma statusi yaratildi",
    type: BookingStatus,
  })
  @Post()
  create(@Body() createBookingStatusDto: CreateBookingStatusDto) {
    return this.bookingStatusService.create(createBookingStatusDto);
  }
  @ApiOperation({ summary: "Barcha buyurtmalar statusini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha buyurtmalar ro'yxati",
    type: [BookingStatus],
  })
  @Get()
  findAll() {
    return this.bookingStatusService.findAll();
  }
  @ApiOperation({ summary: "Buyurtma statusini Id si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma statusi id si bo'yicha olindi",
    type: BookingStatus,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookingStatusService.findOne(+id);
  }

  @ApiOperation({ summary: "Buyurtma statusini Id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma statusi yangilandi",
    type: BookingStatus,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto
  ) {
    return this.bookingStatusService.update(+id, updateBookingStatusDto);
  }

  @ApiOperation({ summary: "Buyurtma statusini Id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma statusi o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookingStatusService.remove(+id);
  }
}
