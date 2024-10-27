import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { VenueService } from "./venue.service";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Venue } from "./models/venue.model";
@ApiTags("Obyekt")
@Controller("venue")
export class VenueController {
  constructor(private readonly venueService: VenueService) {}
  @ApiOperation({ summary: "Obyekt yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yaratilgan obyekt",
    type: Venue,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createVenue(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.createVenue(createVenueDto);
  }

  @ApiOperation({ summary: "Barcha obyektlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha obyektlar ro'yxati",
    type: [Venue],
  })
  @Get()
  async getAllVenues() {
    return this.venueService.getAllVenues();
  }

  @ApiOperation({ summary: "Bitta obyektni ID si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Obyekt topildi",
    type: Venue,
  })
  @Get(":id")
  async getVenueById(@Param("id") id: number) {
    return this.venueService.getVenueById(id);
  }

  @ApiOperation({ summary: "Obyektni Id si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Obyekt o'chirildi",
    type: [Venue],
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteVenueById(@Param("id") id: number) {
    return this.venueService.deleteVenueById(id);
  }

  @ApiOperation({ summary: "Obyektni ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Obyekt yangilandi",
    type: UpdateVenueDto,
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateVenueById(
    @Param("id") id: number,
    @Body() updateVenueDto: UpdateVenueDto
  ) {
    return this.venueService.updateVenueById(id, updateVenueDto);
  }
}
