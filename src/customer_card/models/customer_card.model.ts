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

interface ICustomerCardCreationAttr {
  name: string;
  phone: string;
  card_number: string;
  year: string;
  month: string;
  is_active: boolean;
  is_main: boolean;
  customerId: number;
}

@Table({ tableName: "customer_card", timestamps: false })
export class CustomerCard extends Model<
  CustomerCard,
  ICustomerCardCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Card raqamining unikal id si (autoIncrement) ",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "UZCARD",
    description: "Mijozning kartasi uchun ism.",
    maxLength: 50,
  })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Mijozning telefon raqami.",
    maxLength: 15,
  })
  @Column({ type: DataType.STRING })
  phone: string;

  @ApiProperty({
    example: "1234567890123456",
    description: "Mijozning kartasi raqami.",
    minLength: 16,
    maxLength: 19,
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  card_number: string;

  @ApiProperty({
    example: "25",
    description: "Kartani tugatish yili.",
    minLength: 2,
    maxLength: 4,
  })
  @Column({ type: DataType.CHAR(4) })
  year: string;

  @ApiProperty({
    example: "12",
    description: "Kartani tugash oyi",
  })
  @Column({ type: DataType.CHAR(2) })
  month: string;

  @ApiProperty({
    example: true,
    description: "Kartaning activligi",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Bu kartani asosiy karta belgilash.",
  })
  @Column({ type: DataType.BOOLEAN })
  is_main: boolean;

  @ApiProperty({
    example: 1,
    description: "Mijozning unikal id si.",
  })
  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customerId: number;
  @BelongsTo(() => Customer)
  customer: Customer;
}
