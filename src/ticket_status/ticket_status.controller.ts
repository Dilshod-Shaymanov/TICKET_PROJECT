import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TicketStatusService } from "./ticket_status.service";
import { CreateTicketStatusDto } from "./dto/create-ticket_status.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket_status.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TicketStatus } from "./models/ticket_status.entity";

@ApiTags("Chipta holatlari")
@Controller("ticket-status")
export class TicketStatusController {
  constructor(private readonly ticketStatusService: TicketStatusService) {}

  @ApiOperation({ summary: "Yangi chipta holatini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Chipta holati muvaffaqiyatli qo'shildi",
    type: TicketStatus,
  })
  @Post()
  create(@Body() createTicketStatusDto: CreateTicketStatusDto) {
    return this.ticketStatusService.create(createTicketStatusDto);
  }

  @ApiOperation({ summary: "Barcha chipta holatlarini ko'rsatish" })
  @ApiResponse({
    status: 200,
    description: "Barcha chipta holati ro'yxati",
    type: [TicketStatus],
  })
  @Get()
  findAll() {
    return this.ticketStatusService.findAll();
  }

  @ApiOperation({ summary: "Chipta holatini nomi bilan topish" })
  @ApiResponse({
    status: 200,
    description: "Chipta holati muvaffaqiyatli topildi",
    type: TicketStatus,
  })
  @Get(":name")
  findByPaid(@Param("name") name: string) {
    return this.ticketStatusService.findByName(name);
  }

  @ApiOperation({ summary: "Chipta holatini ID bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: "Chipta holati muvaffaqiyatli topildi",
    type: TicketStatus,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ticketStatusService.findOne(+id);
  }

  @ApiOperation({ summary: "Chipta holatini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Chipta holati muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTicketStatusDto: UpdateTicketStatusDto
  ) {
    return this.ticketStatusService.update(+id, updateTicketStatusDto);
  }

  @ApiOperation({ summary: "Chipta holatini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Chipta holati muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ticketStatusService.remove(+id);
  }
}
