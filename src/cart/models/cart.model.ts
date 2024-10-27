import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { CartStatus } from "../../cart_status/models/cart_status.model";
import { Customer } from "../../customer/models/customer.model";
import { Ticket } from "../../ticket/models/ticket.model";

interface ICartCreationAttr {
  ticketId: number;
  customerId: number;
  cart_statusId: number;
  finishedAt: Date;
}

@Table({ tableName: "cart", updatedAt: false })
export class Cart extends Model<Cart, ICartCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Cart unikal id (autoIncrement) ",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "2024-09-30",
    description: "Savatni tugatish sanasi (YYYY-MM-DD formatida)",
  })
  @Column({ type: DataType.DATEONLY })
  finishedAt: Date;

  @ApiProperty({
    example: 1,
    description: "Biletning unikal identifatori",
  })
  @ForeignKey(() => Ticket)
  @Column({ type: DataType.INTEGER })
  ticketId: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @ApiProperty({
    example: 1,
    description: "Mijozning unikal identifatori",
  })
  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ApiProperty({
    example: 1,
    description: "Savat statusining unikal identifatori",
  })
  @ForeignKey(() => CartStatus)
  @Column({ type: DataType.INTEGER })
  cart_statusId: number;

  @BelongsTo(() => CartStatus)
  cart_status: CartStatus;
}
