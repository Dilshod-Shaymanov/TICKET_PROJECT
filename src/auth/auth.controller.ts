import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/signin.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminSignInDto } from "./dto/admin-signin.dto";
import { CreatorGuard } from "../guards/creator.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Users } from "../users/models/user.model";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchini ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yxatdan o'tgan foydalanuvchi",
    type: String,
  })
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi tizimga kirdi",
    type: String,
  })
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.SignIn(signInDto);
  }

  @ApiOperation({ summary: "Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin qo'shildi",
  })
  @UseGuards(CreatorGuard)
  @UseGuards(JwtAuthGuard)
  @Post("add-admin")
  async addAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.addAdmin(createAdminDto);
  }

  @ApiResponse({
    status: 200,
    description: "Admin tizimga kirdi",
    type: String,
  })
  @Post("admin-sigin")
  @HttpCode(HttpStatus.OK)
  async adminSigIn(@Body() adminSignInDto: AdminSignInDto) {
    return this.authService.adminSigIn(adminSignInDto);
  }
}
