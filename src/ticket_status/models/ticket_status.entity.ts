import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Ticket } from "../../ticket/models/ticket.model";

interface ITicketStatusCreationAttr {
  name: string;
}

@Table({ tableName: "ticket_status", timestamps: false })
export class TicketStatus extends Model<
  TicketStatus,
  ITicketStatusCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Chipta holati unikal IDsi (autoIncrement) ",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "active",
    description: "Chipta holati nomi",
  })
  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Ticket)
  ticket: Ticket;
}
