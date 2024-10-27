import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { SigInCustomerDto } from "./dto/sigin-customer.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Mijozlar")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: "Yangi mijozlar yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi mijoz muvaffaqiyatli yaratildi",
  })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @ApiOperation({ summary: "Mijozni tizimga kirishi" })
  @ApiResponse({
    status: 200,
    description: "Mijoz tizimga muvaffaqiyatli kirdi",
  })
  @Post("signin")
  async customerSignIn(@Body() sigInCustomerDto: SigInCustomerDto) {
    return this.customerService.customerSignIn(sigInCustomerDto);
  }

  @ApiOperation({ summary: "Mijozni tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "Mijoz muvaffaqiyatli tizimdan chiqdi",
  })
  @Get("signout/:id")
  async customerSignOut(@Param("id") id: number) {
    return this.customerService.customerSignOut(id);
  }

  @UseGuards(AdminGuard, JwtAuthGuard)
  @ApiOperation({ summary: "Barcha mijozlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha mijozlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha mijozni olish" })
  @ApiResponse({
    status: 200,
    description: "Berilgan ID bo'yicha mijoz",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerService.findOne(+id);
  }

  @ApiOperation({ summary: "Mijozni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mijoz muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }
  @UseGuards(AdminGuard, JwtAuthGuard)
  @ApiOperation({ summary: "Mijozni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mijoz muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerService.remove(+id);
  }
}
