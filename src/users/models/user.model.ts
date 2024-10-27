import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from "sequelize-typescript";
import { Roles } from "../../roles/models/roles.model";
import { UserRoles } from "./user-role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
  role_value: string;
}

@Table({ tableName: "user", timestamps: false })
export class Users extends Model<Users, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining unikal id raqam (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchi emaili",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description: "Foydalanuvchi passwordi (Strong password)",
  })
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({
    example: "USER",
    description: "Foydalanuvchi dastlabki role",
  })
  @Column({ type: DataType.STRING })
  role_value: string;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchi activligi",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];
}
