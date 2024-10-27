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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CreatorGuard } from "../guards/creator.guard";
import { AdminSelfGuard } from "../guards/admin-self.guard";
import { AdminGuard } from "../guards/admin.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(CreatorGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin qo'shildi",
    type: Admin,
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar ro'yxati",
    type: [Admin],
  })
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Adminni login bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Admin login bo'yicha olindi",
    type: Admin,
  })
  @Get()
  async findByLogin(login: string) {
    return this.adminService.findByLogin(login);
  }

  @ApiOperation({ summary: "Adminni Id si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Admin Id si bo'yicha olindi",
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Adminni ID si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin yangilandi",
    type: Number,
  })
  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni Id si bo'yicha c'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin o'chirilidi",
  })
  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
