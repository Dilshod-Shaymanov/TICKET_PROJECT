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
import { Cart } from "../../cart/models/cart.model";
import { Event } from "../../event/models/event.model";
import { Seat } from "../../seat/models/seat.model";
import { TicketStatus } from "../../ticket_status/models/ticket_status.entity";

interface ITicketCreationAttr {
  eventId: number;
  seatId: number;
  service_free: string;
  price: number;
  ticket_statusId: number;
  ticket_type: number;
}
@Table({ tableName: "ticket", timestamps: false })
export class Ticket extends Model<Ticket, ITicketCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Chiptaning unikal IDsi (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "Yuqori sifatli xizmat",
    description: "Xizmat turi uchun bepul yoki boshqa xizmat haqi",
  })
  @Column({ type: DataType.STRING })
  service_free: string;

  @ApiProperty({
    example: 25000,
    description: "Chipta narxi",
  })
  @Column({ type: DataType.DECIMAL(10, 2) })
  price: number;

  @ApiProperty({
    example: 1,
    description: "Chipta turi (raqam bilan ifodalanadi)",
  })
  @Column({ type: DataType.INTEGER })
  ticket_type: number;

  @ApiProperty({
    example: 2,
    description: "Chipta unikal identifikatori",
  })
  @ForeignKey(() => TicketStatus)
  @Column({ type: DataType.INTEGER })
  ticket_statusId: number;
  @BelongsTo(() => TicketStatus)
  ticketStatus: TicketStatus;

  @ForeignKey(() => Event)
  @ApiProperty({
    example: 3,
    description: "Chiptaning bog'langan tadbir IDsi",
  })
  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER })
  eventId: number;
  @BelongsTo(() => Event)
  event: Event;

  @ApiProperty({
    example: 1,
    description: "O'rindiq identifikatori (Seat modeli)",
  })
  @ForeignKey(() => Seat)
  @Column({ type: DataType.INTEGER })
  seatId: number;

  @BelongsTo(() => Seat)
  seat: Seat;

  @HasMany(() => Cart)
  cart: Cart[];
}
