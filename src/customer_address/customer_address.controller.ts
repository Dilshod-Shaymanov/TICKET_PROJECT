import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CustomerAddressService } from "./customer_address.service";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomerAddress } from "./models/customer_address.model";

@ApiTags("Mijoz manzillari")
@Controller("customer-address")
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService
  ) {}

  @ApiOperation({ summary: "Yangi mijoz manzilini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi mijoz manzili muvaffaqiyatli yaratildi",
    type: CustomerAddress,
  })
  @Post()
  create(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerAddressDto);
  }

  @ApiOperation({ summary: "Barcha mijoz manzillarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha mijoz manzillari ro'yxati",
    type: [CustomerAddress],
  })
  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha mijoz manzilini olish" })
  @ApiResponse({
    status: 200,
    description: "Berilgan ID bo'yicha mijoz manzili",
    type: CustomerAddress,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerAddressService.findOne(+id);
  }

  @ApiOperation({ summary: "Mijoz manzilini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mijoz manzili muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto
  ) {
    return this.customerAddressService.update(+id, updateCustomerAddressDto);
  }

  @ApiOperation({ summary: "Mijoz manzilini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mijoz manzili muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerAddressService.remove(+id);
  }
}
