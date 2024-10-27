import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IBookingStatusCreationAttr {
  name: string;
}
@Table({ tableName: "booking_status", timestamps: false })
export class BookingStatus extends Model<
  BookingStatus,
  IBookingStatusCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "unikal status id (autoIncrement) ",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "paid",
    description: "status nomi",
  })
  @Column({ type: DataType.STRING })
  name: string;
}
