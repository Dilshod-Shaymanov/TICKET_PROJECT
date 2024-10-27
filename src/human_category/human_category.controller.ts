import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from "@nestjs/common";
import { HumanCategoryService } from "./human_category.service";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";
import { Response } from "express";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { HumanCategory } from "./models/human_category.model";

@ApiTags("Inson toifalar")
@Controller("human_category")
export class HumanCategoryController {
  constructor(private readonly humanCategoryService: HumanCategoryService) {}

  // Inson toifasi qo'shish
  @ApiOperation({ summary: "Inson toifasi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Inson toifasi muvvafiyatli qo'shildi",
    type: HumanCategory,
  })
  @Post()
  async createHumanCategory(
    @Body() createHumanCategoryDto: CreateHumanCategoryDto
  ) {
    return this.humanCategoryService.createHumanCategory(
      createHumanCategoryDto
    );
  }
  // Barcha inson toifalarini olish
  @ApiOperation({ summary: "Barcha inson toifalarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha toifalar muvaffaqiyatli qaytarildi",
    type: [HumanCategory],
  })
  @Get()
  async getHumanCategoryies() {
    return this.humanCategoryService.getHumanCategoryies();
  }

  // ID bo'yicha inson toifasini olish
  @ApiOperation({ summary: "ID bo'yicha inson toifasini olish" })
  @ApiParam({ name: "id", description: "Inson toifasi ID si", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Inson toifasi muvaffaqiyatli qaytarildi",
    type: HumanCategory,
  })
  @ApiResponse({
    status: 404,
    description: "Inson toifasi topilmadi",
  })
  @Get(":id")
  getHumanCategoryById(@Param("id") id: number) {
    return this.humanCategoryService.getHumanCategoryById(id);
  }

  // ID bo'yicha inson toifasini o'chirish
  @ApiOperation({ summary: "ID bo'yicha inson toifasini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Inson toifasi muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Inson toifasi topilmadi",
  })
  @Delete(":id")
  deleteHumanCategoryById(@Param("id") id: number) {
    return this.humanCategoryService.deleteHumanCategoryById(id);
  }
  // Nomi bo'yicha o'chirish
  @ApiOperation({ summary: "Nomi bo'yicha inson toifasini olish" })
  @ApiQuery({
    name: "name",
    description: "Inson toifasi nomi",
    example: "Bolalar",
  })
  @ApiResponse({
    status: 200,
    description: "Inson toifasi muvaffaqiyatli qaytarildi",
    type: HumanCategory,
  })
  @ApiResponse({
    status: 404,
    description: "Inson toifasi topilmadi",
  })
  @Get(":name")
  getHumanCategoryByName(@Query("name") name: string) {
    return this.humanCategoryService.getHumanCategoryByName(name);
  }

  // ID bo'yicha inson toifasini yangilash
  @ApiOperation({ summary: "ID bo'yicha inson toifasini yangilash" })
  @ApiParam({ name: "id", description: "Inson toifasi ID si", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Inson toifasi muvaffaqiyatli yangilandi",
    type: HumanCategory,
  })
  @ApiResponse({
    status: 404,
    description: "Inson toifasi topilmadi",
  })
  @Put(":id")
  async updateHumanCategoryById(
    @Param("id") id: number,
    @Body() updateHumanCategoryDto: UpdateHumanCategoryDto
  ) {
    return this.humanCategoryService.updateHumanCategoryById(
      id,
      updateHumanCategoryDto
    );
  }
}
