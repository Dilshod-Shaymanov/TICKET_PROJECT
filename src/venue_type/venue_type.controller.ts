import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { VenueTypeService } from "./venue_type.service";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { VenueType } from "./models/venue-type.model";

@ApiTags("Joy turi")
@Controller("venue_type")
export class VenueTypeController {
  constructor(private readonly venueTypeService: VenueTypeService) {}

  @ApiOperation({
    summary: "Joy turini yaratish",
  })
  @ApiResponse({
    status: 201,
    description: "Yaratilgan joy turi",
    type: VenueType,
  })
  @Post()
  async createVenueType(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeService.createVenueType(createVenueTypeDto);
  }

  @ApiOperation({
    summary: "Barcha joy turini olish",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha joy turlari ro'yxati",
    type: [VenueType],
  })
  @Get()
  async getAllVenueType() {
    return this.venueTypeService.getAllVenueType();
  }

  @ApiOperation({
    summary: "Bitta joy turini ID bo'yicha olish ",
  })
  @ApiResponse({
    status: 200,
    description: "Joy turi topildi",
    type: VenueType,
  })
  @Get(":id")
  async getVenueTypeById(@Param("id") id: number) {
    return this.venueTypeService.getVenueTypeById(id);
  }

  @ApiOperation({ summary: "Joy turini ID bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Joy turi o'chirildi",
  })
  @Delete(":id")
  async deleteVenueTypeById(@Param("id") id: number) {
    return this.venueTypeService.deleteVenueTypeById(id);
  }

  @ApiOperation({ summary: "Joy turini ID bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Joy turi yangilandi",
    type: VenueType,
  })
  @Patch(":id")
  async updateVenueTypeById(
    @Param("id") id: number,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto
  ) {
    return this.venueTypeService.updateVenueTypeById(id, updateVenueTypeDto);
  }
}
