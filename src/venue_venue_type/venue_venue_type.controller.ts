import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueVenueTypeService } from './venue_venue_type.service';
import { CreateVenueVenueTypeDto } from './dto/create-venue_venue_type.dto';
import { UpdateVenueVenueTypeDto } from './dto/update-venue_venue_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Venue-VenueType")
@Controller("venue-venue-type")
export class VenueVenueTypeController {
  constructor(private readonly venueVenueTypeService: VenueVenueTypeService) {}

  @ApiOperation({ summary: "Yangi venue-venueType yaratish" }) // Endpointning maqsadi
  @ApiResponse({
    status: 201,
    description: "Yangi venue-venueType muvaffaqiyatli yaratildi",
  })
  @Post()
  create(@Body() createVenueVenueTypeDto: CreateVenueVenueTypeDto) {
    return this.venueVenueTypeService.create(createVenueVenueTypeDto);
  }

  @ApiOperation({ summary: "Barcha venue-venueType larni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha venue-venueType lar ro'yxati",
  })
  @Get()
  findAll() {
    return this.venueVenueTypeService.findAll();
  }

  @ApiOperation({ summary: "Muayyan venue-venueTypeni id si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "venue-venueType id si bo'yicha topildi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.venueVenueTypeService.findOne(+id);
  }

  @ApiOperation({ summary: "venue-venueTypeni id si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "venue-venueType id si bo'yicha yangilandi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVenueVenueTypeDto: UpdateVenueVenueTypeDto
  ) {
    return this.venueVenueTypeService.update(+id, updateVenueVenueTypeDto);
  }

  @ApiOperation({ summary: "Venue-venueTypeni id si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Venue-venueType id si bo'yicha o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.venueVenueTypeService.remove(+id);
  }
}
