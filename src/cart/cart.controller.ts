import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Cart } from "./models/cart.model";

@ApiTags("Savat")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: "Yanig savat yaratish" })
  @ApiResponse({
    status: 201,
    description: "Savat muvaffaqiyatli yaratildi",
    type: Cart,
  })
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: "Barcha savatlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha savatlar ro'yxati",
    type: [Cart],
  })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: "savatni id si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Savat id orqali olindi",
    type: Cart,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartService.findOne(+id);
  }

  @ApiOperation({ summary: "Savatni id si orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Savat muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @ApiOperation({ summary: "Savatni ID si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Savat muvaffaqiyatli o'chirildi",
    type: Number,
  })
  @ApiResponse({ status: 404, description: "Savat topilmadi." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(+id);
  }
}
