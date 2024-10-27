import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  name: string;
  email: string;
  password: string;
  is_creator: boolean;
  is_active: boolean;
  login: string;
}

@Table({ tableName: "admin", timestamps: false })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Admin Unikal ID si (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "Bobur",
    description: "Admin ismi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: "bobur@gmail.com",
    description: "Admin emaili (unikal)",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: "Bobur1234",
    description: "Admin paroli (raqam va harflar) ",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: false,
    description: "Admin creator yoki yo'q",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_creator: boolean;

  @ApiProperty({
    example: true,
    description: "Admin aktivligi",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @ApiProperty({
    example: "BoburLogin",
    description: "Admin logini (unikal)",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @ApiProperty({
    example: "fdnindnjff651f15s61f5dfhd3225435.fds",
    description: "Admin refresh tokeni",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  hashed_refresh_token?: string; // Optional field
}
