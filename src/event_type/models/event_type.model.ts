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
import { Event } from "../../event/models/event.model";

interface IEventTypeCreationAttr {
  name: string;
}

@Table({ tableName: "event_type", timestamps: false })
export class EventType extends Model<EventType, IEventTypeCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "EventType jadvalidagi asosiy kalit",
  })
  @ForeignKey(() => EventType)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "Sport",
    description: "Tadbir turi nomi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    type: [Event],
    description: "Ushbu tadbir turiga bog'liq bo'lgan tadbirlar",
  })
  @HasMany(() => Event)
  event: Event[];

  @ApiProperty({
    example: 2,
    description: "Ota tadbir turi ID'si, agar mavjud bo'lsa",
  })
  @ForeignKey(() => EventType)
  @Column({ type: DataType.INTEGER })
  parent_event_type_id: number;

  @BelongsTo(() => EventType)
  parent_event_type: EventType;
}
