import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRoles } from "../../users/models/user-role.model";
import { Users } from "../../users/models/user.model";

interface IRolesCreationAttr {
  value: string;
  description: string;
}

@Table({ tableName: "roles", timestamps: false })
export class Roles extends Model<Roles, IRolesCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unikal role id (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "Admin", description: "Bu yerda rollar kiritiladi" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: "Admin role malumotlari",
    description: "Bu yerda rol bo'yicha to'liq malumot kiritiladi",
  })
  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => Users, () => UserRoles)
  roles: Users[];
}
