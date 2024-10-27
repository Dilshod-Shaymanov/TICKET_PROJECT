import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { VenuePhotoService } from "./venue_photo.service";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { VenuePhoto } from "./models/veneu_photo.model";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Obyekt Suratlari")
@Controller("venue_photo")
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @ApiOperation({ summary: "Obyekt suratlarini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yaratilgan obyekt suratlari",
    type: VenuePhoto,
  })
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  create(
    @Body() createVenuePhotoDto: CreateVenuePhotoDto,
    @UploadedFile() image: any
  ) {
    return this.venuePhotoService.create(createVenuePhotoDto, image);
  }

  @ApiOperation({ summary: "Barcha obyekt suratlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha obyekt suratlari",
    type: [VenuePhoto],
  })
  @Get()
  findAll() {
    return this.venuePhotoService.findAll();
  }

  @ApiOperation({ summary: "Id bo'yicha obyekt suratini olish" })
  @ApiResponse({
    status: 200,
    description: "Id bo'yicha obyekt surati olindi",
    type: VenuePhoto,
  })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.venuePhotoService.findById(id);
  }

  @ApiOperation({ summary: "Obyekt suratini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan obyekt surati",
    type: VenuePhoto,
  })
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateVenuePhotoDto: UpdateVenuePhotoDto
  ) {
    return this.venuePhotoService.update(id, updateVenuePhotoDto);
  }

  @ApiOperation({ summary: "Obyekt suratini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan obyekt surati",
  })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.venuePhotoService.remove(id);
  }
}
