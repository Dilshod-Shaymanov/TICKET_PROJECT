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
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { AdminGuard } from "../guards/admin.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Ticket } from "./models/ticket.model";

@ApiTags("Chiptalar")
@Controller("ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: "Yangi chipta yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi chipta muvaffaqiyatli yaratildi",
    type: Ticket,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @ApiOperation({ summary: "Barcha chiptalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Chiptalar ro'yxati",
    type: [Ticket],
  })
  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha chipta olish" })
  @ApiResponse({
    status: 200,
    description: "ID bo'yicha chipta topildi",
    type: Ticket,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ticketService.findOne(+id);
  }

  @ApiOperation({ summary: "ID bo'yicha chiptani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Chipta muvaffaqiyatli yangilandi",
    type: Ticket,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }
  @ApiOperation({ summary: "ID bo'yicha chiptani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Chipta muvaffaqiyatli o'chirildi",
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ticketService.remove(+id);
  }
}
