import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Booking } from "./models/booking.model";

@ApiTags("Buyurtma berish")
@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: "Buyurtmalar yaratish" })
  @ApiResponse({
    status: 201,
    description: "Buyurtma yaratilidi",
    type: Booking,
  })
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }
  @ApiOperation({ summary: "Barcha buyurtmalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha buyurtmalar ro'yxati",
    type: [Booking],
  })
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }
  @ApiOperation({ summary: "Buyurtmani ID bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma muvaffaqiyatli topildi",
    type: Booking,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookingService.findOne(+id);
  }
  @ApiOperation({ summary: "Buyurtmani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma yangilandi",
    type: Booking,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }
  @ApiOperation({ summary: "Buyurtmani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookingService.remove(+id);
  }
}
