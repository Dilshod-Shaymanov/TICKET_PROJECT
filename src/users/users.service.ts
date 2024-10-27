import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./models/user.model";
import { RolesService } from "../roles/roles.service";
import { Roles } from "../roles/models/roles.model";
import { AddRemoveRoleDto } from "./dto/add-remove-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private usersModel: typeof Users,
    // @InjectModel(Roles) private roleModel: typeof Users,
    private readonly rolesService: RolesService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersModel.create(createUserDto);
    // const role = await this.roleModel.findOne({
    //   where: { role_value: createUserDto.role_value },
    // });
    const role = await this.rolesService.findRoleByValue(
      createUserDto.role_value
    );
    if (!role) {
      throw new BadRequestException("Role not found");
    }
    // console.log(role);

    await newUser.$set("roles", [role.id]); // Bu yerda UserRoles ga o'tib o'sha yerdagi roleId ga va userId ga yangi id qo'shib qo'yadi
    await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  findUserByEmail(email: string) {
    return this.usersModel.findOne({
      where: { email },
      include: {
        all: true,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
  }

  findAll() {
    return this.usersModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.usersModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    this.usersModel.destroy({ where: { id } });
    return {
      message: "Foydalanuvchi o'chirilidi",
    };
  }

  async addRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const user = await this.usersModel.findByPk(addRemoveRoleDto.userId);
    const role = await this.rolesService.findRoleByValue(
      addRemoveRoleDto.role_value
    );
    if (role && user) {
      await user.$add("roles", role.id);
      const updatedUser = await this.usersModel.findByPk(
        addRemoveRoleDto.userId,
        { include: { all: true } }
      );
      return updatedUser;
    }
    throw new NotFoundException("Foydalanuvchi yoki role topilmadi");
  }

  async removeRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const user = await this.usersModel.findByPk(addRemoveRoleDto.userId);
    const role = await this.rolesService.findRoleByValue(
      addRemoveRoleDto.role_value
    );
    if (role && user) {
      await user.$remove("roles", role.id);
      const updatedUser = await this.usersModel.findByPk(
        addRemoveRoleDto.userId,
        { include: { all: true } }
      );
      return updatedUser;
    }
    throw new NotFoundException("Foydalanuvchi yoki role topilmadi");
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.usersModel.findByPk(activateUserDto.userId);

    if (user) {
      user.is_active = true;
      await user.save();
      return user;
    }
    throw new NotFoundException("Foydalanuvchi topilmadi");
  }
}
