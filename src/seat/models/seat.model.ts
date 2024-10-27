import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Event } from "../../event/models/event.model";
import { SeatType } from "../../seat_type/models/seat-type.model";
import { Ticket } from "../../ticket/models/ticket.model";
import { Venue } from "../../venue/models/venue.model";

interface ISeatAtt {
  sector: string;
  row_number: number;
  number: number;
  location: string;
}

@Table({ tableName: "seat", timestamps: false })
export class Seat extends Model<Seat, ISeatAtt> {
  @ApiProperty({
    example: 1,
    description: "O'rindiq unikal id si (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "4-sector",
    description: "sector nomi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  sector: string;

  @ApiProperty({
    example: 5,
    description: "Qator raqami (row_number)",
  })
  @Column({ type: DataType.INTEGER })
  row_number: number;

  @ApiProperty({
    example: 5,
    description: "O'rindiq raqami",
  })
  @Column({ type: DataType.INTEGER })
  number: number;

  @ApiProperty({
    example: "Chap qanot, old",
    description: "O'rindiq joylashuvi (location)",
  })
  @Column({ type: DataType.STRING })
  location: string;

  @ApiProperty({
    example: 2,
    description: "Venue unikal identifikatori",
  })
  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venueId: number;

  @BelongsTo(() => Venue)
  venue: Venue;

  @ApiProperty({
    example: 2,
    description: "Seat type unikal identifikatori",
  })
  @ForeignKey(() => SeatType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  seat_typeId: number;

  @BelongsTo(() => SeatType)
  seatTypes: SeatType;

  @HasMany(() => Ticket)
  ticket: Ticket;

  @BelongsToMany(() => Event, () => Ticket)
  event: Event[];
}
