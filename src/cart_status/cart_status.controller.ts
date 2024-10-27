import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CartStatusService } from "./cart_status.service";
import { CreateCartStatusDto } from "./dto/create-cart_status.dto";
import { UpdateCartStatusDto } from "./dto/update-cart_status.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CartStatus } from "./models/cart_status.model";

@ApiTags("Savat Statusi")
@Controller("cart-status")
export class CartStatusController {
  constructor(private readonly cartStatusService: CartStatusService) {}

  @ApiOperation({ summary: "Yangi Savat status yaratish" })
  @ApiResponse({
    status: 201,
    description: "Savat status muvaffaqiyatli yaratildi",
    type: CartStatus,
  })
  @Post()
  create(@Body() createCartStatusDto: CreateCartStatusDto) {
    return this.cartStatusService.create(createCartStatusDto);
  }

  @ApiOperation({ summary: "Barcha savat statuslarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha savat statuslar ro'yxati",
    type: [CartStatus],
  })
  @Get()
  findAll() {
    return this.cartStatusService.findAll();
  }

  @ApiOperation({ summary: "Savat statusini Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Savat statusi Id orqali olindi",
    type: CartStatus,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartStatusService.findOne(+id);
  }

  @ApiOperation({ summary: "Savat statusini Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Savat statusi muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCartStatusDto: UpdateCartStatusDto
  ) {
    return this.cartStatusService.update(+id, updateCartStatusDto);
  }

  @ApiOperation({ summary: "Savat statusini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Savat statusi muvaffaqiyatli o'chirildi",
    type: Number,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartStatusService.remove(+id);
  }
}
