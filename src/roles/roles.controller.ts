import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "./models/roles.model";

@ApiTags("Foydalanuvchilar rollari")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: "Yangi role qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi role yaratildi",
    type: Roles,
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Barcha rollarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha rollar ro'yxati",
    type: [Roles],
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: "Rolni param bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Rolni value orqali paramdan olindi",
  })
  @Get("/value/:value")
  findRoleByValue(@Param("value") value: string) {
    return this.rolesService.findRoleByValue(value);
  }

  @ApiOperation({ summary: "Rolni ID bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Rolni ID orqali topildi",
    type: Roles,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @ApiOperation({ summary: "Rolni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Rol yangilandi",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "Rolni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Rol o'chirildi",
    type: Roles,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
