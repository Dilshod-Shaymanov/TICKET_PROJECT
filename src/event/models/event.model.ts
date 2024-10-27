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
import { EventType } from "../../event_type/models/event_type.model";
import { HumanCategory } from "../../human_category/models/human_category.model";
import { Language } from "../../language/models/language.model";
import { Seat } from "../../seat/models/seat.model";
import { Ticket } from "../../ticket/models/ticket.model";
import { Venue } from "../../venue/models/venue.model";

interface IEventCreationAttr {
  name: string;
  photo: string;
  start_date: Date;
  start_time: Date;
  finish_date: Date;
  finish_time: Date;
  info: string;
  realease_date: Date;
  languageId: number;
  human_categoryId: number;
  event_typeId: number;
  venueId: number;
}
@Table({ tableName: "event", timestamps: false })
export class Event extends Model<Event, IEventCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Tadbirning unikal id si (autoIncrement) ",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({ description: "Tadbirning nomi", example: "Konsert" })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({
    description: "Tadbirga tegishli rasm",
    example: "url/to/photo.jpg",
  })
  @Column({ type: DataType.STRING })
  photo: string;

  @ApiProperty({
    description: "Tadbirning boshlanish sanasi",
    example: "2024-09-26",
  })
  @Column({ type: DataType.DATEONLY })
  start_date: Date;

  @ApiProperty({
    description: "Tadbirning boshlanish vaqti",
    example: "14:00:00",
  })
  @Column({ type: DataType.TIME })
  start_time: Date;

  @ApiProperty({
    description: "Tadbirning tugash sanasi",
    example: "2024-09-26",
  })
  @Column({ type: DataType.DATEONLY })
  finish_date: Date;

  @ApiProperty({ description: "Tadbirning tugash vaqti", example: "16:00:00" })
  @Column({ type: DataType.TIME })
  finish_time: Date;

  @ApiProperty({
    description: "Tadbir haqida qo'shimcha ma'lumot",
    example: "Bu tadbirda mashhur san'atchilar qatnashadi.",
  })
  @Column({ type: DataType.STRING })
  info: string;

  @ApiProperty({
    description: "Tadbirning chiqarilish sanasi",
    example: "2024-09-01",
  })
  @Column({ type: DataType.DATEONLY })
  realease_date: Date;

  @ApiProperty({
    description: "Tadbir tilining unikal identifikatori",
    example: 1,
  })
  @ForeignKey(() => Language)
  @Column({ type: DataType.INTEGER, allowNull: true })
  languageId: number;

  @BelongsTo(() => Language)
  language: Language;

  @ApiProperty({ description: "Odam toifasining identifikatori", example: 2 })
  @ForeignKey(() => HumanCategory)
  @Column({ type: DataType.INTEGER, allowNull: true })
  human_categoryId: number;

  @BelongsTo(() => HumanCategory)
  human_category: HumanCategory;

  @ApiProperty({ description: "Tadbir turining identifikatori", example: 3 })
  @ForeignKey(() => EventType)
  @Column({ type: DataType.INTEGER, allowNull: true })
  event_typeId: number;

  @BelongsTo(() => EventType)
  eventType: EventType;

  @ApiProperty({ description: "Joyning identifikatori", example: 4 })
  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER, allowNull: true })
  venueId: number;
  @BelongsTo(() => Venue)
  venue: Venue;

  @HasMany(() => Ticket)
  tickets: Ticket;
  // Seat tabeli uchun belonstoMany bilan bog'landi
  @BelongsToMany(() => Seat, () => Ticket)
  seats: Seat[];
}
