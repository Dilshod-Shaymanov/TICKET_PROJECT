import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRemoveRoleDto } from "./dto/add-remove-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { SelfGuard } from "../guards/self.guard";
import { Roles } from "../decorator/roles-auth.decorator";
import { RolesGuard } from "../guards/roles.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Users } from "./models/user.model";

@ApiTags("Foydalanuvchilar")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Foydalanuvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuchi yaratilid",
    type: Users,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish " })
  @ApiResponse({
    status: 200,
    description: "Barcha userlar ro'yxati",
    type: [Users],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchini ID si bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "User Id bo'yicha olindi",
    type: Users,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini ID si bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: "User id bo'yicha yangilandi",
    type: Number,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini ID si bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: "user Id bo'yicha o'chirildi",
    type: Number,
  })
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchiga role qo'shish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchiga yangi role qo'shildi",
  })
  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(RolesGuard)
  @Post("add-role")
  @HttpCode(200)
  async addRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.addRole(addRemoveRoleDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini roleni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi role o'chirildi",
    type: Number,
  })
  @Post("delete-role")
  async removeRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.removeRole(addRemoveRoleDto);
  }
  @ApiOperation({ summary: "Foydalanuvchini activalshtirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi activlashtirildi",
  })
  @HttpCode(200)
  @Post("activate-user")
  async activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }
}
