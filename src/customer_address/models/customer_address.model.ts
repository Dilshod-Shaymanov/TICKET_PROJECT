import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Customer } from "../../customer/models/customer.model";
import { District } from "../../district/models/district.model";
import { Region } from "../../region/models/region.model";

interface ICustomerAddressCreationAttr {
  name: string;
  street: string;
  house: string;
  flat: number;
  location: string;
  post_index: string;
  info: string;
  districtId: number;
  regionId: number;
  customerId: number;
}

@Table({ tableName: "customer_address", timestamps: false })
export class CustomerAddress extends Model<
  CustomerAddress,
  ICustomerAddressCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Mijoz manizlining id si (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "Bobur",
    description: "Mijoz manzilining nomi",
    maxLength: 50,
  })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({
    example: "Bahor ko'chasi",
    description: "Mijoz manzilining ko'chasi",
    maxLength: 100,
  })
  @Column({ type: DataType.STRING })
  street: string;

  @ApiProperty({
    example: "12",
    description: "Mijoz manzilining uyi",
  })
  @Column({ type: DataType.STRING })
  house: string;

  @ApiProperty({
    example: 5,
    description: "Mijoz manzilining kvartira raqami",
  })
  @Column({ type: DataType.INTEGER })
  flat: number;

  @ApiProperty({
    example: "Toshkent",
    description: "Mijoz manzilining joylashuvi",
  })
  @Column({ type: DataType.STRING })
  location: string;

  @ApiProperty({
    example: "100000",
    description: "Mijoz manzilining pochta indeksi",
    minLength: 5,
    maxLength: 10,
  })
  @Column({ type: DataType.STRING })
  post_index: string;

  @ApiProperty({
    example: "Qo'shimcha ma'lumotlar",
    description: "Qo'shimcha ma'lumotlar (ixtiyoriy)",
    maxLength: 200,
    required: false,
  })
  @Column({ type: DataType.STRING })
  info: string;

  @ApiProperty({
    example: 1,
    description: "Mijozning region unikal identifikatori",
  })
  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;
  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({
    example: 1,
    description: "Mijozning district unikal identifikatori",
  })
  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER })
  districtId: number;
  @BelongsTo(() => District)
  district: District;

  @ApiProperty({
    example: 1,
    description: "Mijozning  unikal identifikatori",
  })
  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customerId: number;
  @BelongsTo(() => Customer)
  customer: Customer;
}
