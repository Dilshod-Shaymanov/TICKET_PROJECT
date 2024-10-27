import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../users/models/user.model";
import { SignInDto } from "./dto/signin.dto";
import { AdminService } from "../admin/admin.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { Admin } from "../admin/models/admin.model";
import { AdminSignInDto } from "./dto/admin-signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly JwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashed_password,
    });

    return this.generateToken(newUser);
  }

  async SignIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const validPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );
    if (!validPassword) {
      throw new UnauthorizedException("User not found");
    }
    return {
      token: await this.generateToken(user),
    };
  }

  async generateToken(user: Users) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    return this.JwtService.sign(payload);
  }

  async addAdmin(createAdminDto: CreateAdminDto) {
    const old_admin = await this.adminService.findByLogin(createAdminDto.login);
    if (old_admin) {
      throw new NotFoundException("Bunday admin mavjud");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);

    const admin = await this.adminService.create({
      ...createAdminDto,
      password: hashed_password,
    });
    const token = await this.adminGenerateToken(admin);
    admin.hashed_refresh_token = String(token);
    await admin.save();

    return {
      message: "Admin added successfully",
      data: admin,
    };
  }

  async adminGenerateToken(user: Admin) {
    const payload = {
      sub: user.id,
      is_creator: user.is_creator,
      email: user.email,
    };
    return this.JwtService.sign(payload);
  }

  async adminSigIn(adminSignInDto: AdminSignInDto) {
    const admin = await this.adminService.findByLogin(adminSignInDto.login);
    if (!admin) {
      throw new UnauthorizedException("Login or password incorrect");
    }

    const validPassword = await bcrypt.compare(
      adminSignInDto.password,
      admin.password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Login or password incorrect");
    }
    return {
      message: "Admin signed in successfully",
      token: await this.adminGenerateToken(admin),
    };
  }
}
