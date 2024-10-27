import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Event } from "../../event/models/event.model";

interface ILanueageCreationAttr {
  name: string;
}

@Table({ tableName: "language", timestamps: false })
export class Language extends Model<Language, ILanueageCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Tilni unikal id si (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "Russian",
    description: "Til nomi",
  })
  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Event)
  event: Event[];
}
