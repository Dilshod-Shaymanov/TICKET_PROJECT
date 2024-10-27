import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { CustomerAddress } from "../../customer_address/models/customer_address.model";
import { District } from "../../district/models/district.model";
import { Venue } from "../../venue/models/venue.model";

interface IRegion {
  name: string;
}

@Table({ tableName: "region", timestamps: false })
export class Region extends Model<Region, IRegion> {
  @ApiProperty({
    example: 1,
    description: "Viloyat unikal id si (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "Toshkent",
    description: "Viloyat nomi",
  })
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @HasMany(() => Venue)
  venue: Venue[];

  @HasMany(() => District)
  district: District[];

  @HasMany(() => CustomerAddress)
  customerAddress: CustomerAddress[];
}
