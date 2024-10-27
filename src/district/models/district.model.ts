import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { CustomerAddress } from "../../customer_address/models/customer_address.model";
import { Region } from "../../region/models/region.model";

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district", timestamps: false })
export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Tumaning unikal identifikatori (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "Urgut",
    description: "Tuman nomi",
  })
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @ApiProperty({
    example: 1,
    description: "Tuman joylashgan viloyatning identifikatori",
  })
  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => CustomerAddress)
  customerAddress: CustomerAddress[];
}
