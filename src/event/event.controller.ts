import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Seat } from "../seat/models/seat.model";
import { Event } from "./models/event.model";

@ApiTags("Tadbirlar")
@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Yangi tadbir yaratish" })
  @ApiResponse({
    status: 201,
    description: "Tadbir muvaffaqiyatli yaratildi",
    type: Event,
  })
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @ApiOperation({ summary: "Barcha tadbirlarni olish" })
  @ApiResponse({
    status: 201,
    description: "Barcha tadbirlar ro'yxati",
    type: [Event],
  })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }
  @ApiOperation({ summary: "ticket status sotilgan o'rindiqlarni chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Sotilgan joylar nomi chiqarildi",
    type: [Seat],
  })
  @Get("byname")
  async getSeatByTicketStatusName() {
    return this.eventService.getSeatByTicketStatusName();
  }

  // @Get("get-sold-seat")
  // async getSoldSeat() {
  //   return this.eventService.getSoldSeat();
  // }

  // @Get("through-ticket")
  // async getSoldSeatThroughBelongstoMany() {
  //   return this.eventService.getSoldSeatThroughBelongstoMany();
  // }

  @ApiOperation({ summary: "Tadbirni id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Tadbir topildi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Tadbirni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Tadbir muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Tadbirni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Tadbir muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventService.remove(+id);
  }
}
