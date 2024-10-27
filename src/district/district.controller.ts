import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { District } from "./models/district.model";

@ApiTags("Tumanlar")
@Controller("district")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: "Yangi tuman yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi tuman yaratildi.",
    type: District,
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: "Barcha tumanlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha tumanlar ro'yxati.",
    type: [District],
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: "Tumanni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Berilgan IDga ega tuman.",
    type: District,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: "Tumanni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Tumanni muvaffaqiyatli yangilandi.",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDistrictDto: UpdateDistrictDto
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: "Tumanni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Tumanni muvaffaqiyatli o'chirildi.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.districtService.remove(+id);
  }
}
