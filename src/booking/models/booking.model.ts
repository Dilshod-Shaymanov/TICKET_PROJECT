import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { BookingStatus } from "../../booking_status/models/booking_status.model";
import { Cart } from "../../cart/models/cart.model";

interface IBookingCreationAttr {
  cartId: number;
  booking_statusId: number;
  payment_methodId?: number;
  delivery_methodId?: number;
  discount_couponId?: number;
  finishedAt: Date;
}

@Table({ tableName: "booking", updatedAt: false })
export class Booking extends Model<Booking, IBookingCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Bookin unikal id (autoIncrement) ",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "2021-02-02",
    description: "Oxirigi muddati",
  })
  @Column({ type: DataType.DATEONLY })
  finishedAt: Date;

  @ApiProperty({
    example: 1,
    description: "cart id",
  })
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER })
  cartId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ApiProperty({
    example: 1,
    description: "booking status id",
  })
  @ForeignKey(() => BookingStatus)
  @Column({ type: DataType.INTEGER })
  booking_statusId: number;

  @BelongsTo(() => BookingStatus)
  booking_status: BookingStatus;
}
