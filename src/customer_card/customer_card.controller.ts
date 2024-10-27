import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CustomerCardService } from "./customer_card.service";
import { CreateCustomerCardDto } from "./dto/create-customer_card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer_card.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomerCard } from "./models/customer_card.model";

@ApiTags("Mijoz kartalari")
@Controller("customer-card")
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @ApiOperation({ summary: "Yangi mijoz kartasini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Mijoz kartasi muvaffaqiyatli yaratildi",
    type: CustomerCard,
  })
  @Post()
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @ApiOperation({ summary: "Barcha mijoz kartalarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha mijoz kartalari ro'yxati",
    type: [CustomerCard],
  })
  @Get()
  findAll() {
    return this.customerCardService.findAll();
  }

  @ApiOperation({ summary: "Mijoz kartasini ID bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Mijoz kartasi muvaffaqiyatli topildi",
    type: CustomerCard,
  })
  @ApiResponse({
    status: 404,
    description: "Mijoz kartasi topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerCardService.findOne(+id);
  }

  @ApiOperation({ summary: "Mijoz kartasini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mijoz kartasi muvaffaqiyatli yangilandi",
    type: CustomerCard,
  })
  @ApiResponse({
    status: 404,
    description: "Mijoz kartasi topilmadi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto
  ) {
    return this.customerCardService.update(+id, updateCustomerCardDto);
  }

  @ApiOperation({ summary: "Mijoz kartasini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mijoz kartasi muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Mijoz kartasi topilmadi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerCardService.remove(+id);
  }
}
