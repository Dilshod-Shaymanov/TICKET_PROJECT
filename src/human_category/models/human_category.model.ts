import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Event } from "../../event/models/event.model";

interface IHumanCategoryAttr {
  name: string;
  start_age: number;
  finish_age: number;
  gender: number;
}

@Table({ tableName: "human_category", timestamps: false })
export class HumanCategory extends Model<HumanCategory, IHumanCategoryAttr> {
  @ApiProperty({
    example: 1,
    description: "Inson toifasi noyob identificator(autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "Yoshlar",
    description: "Inson toifasi nomi",
    maxLength: 100,
  })
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @ApiProperty({
    example: 4,
    description: "Inson toifasidagi eng kichik yosh",
  })
  @Column({ type: DataType.SMALLINT })
  start_age: number;

  @ApiProperty({
    example: 15,
    description: "Inson toifasidagi eng katta yosh",
  })
  @Column({ type: DataType.SMALLINT })
  finish_age: number;

  @ApiProperty({
    example: 1,
    description: "Jinsi: 1 - erkak, 2- ayol",
    enum: [1, 2],
  })
  @Column({ type: DataType.SMALLINT })
  gender: number;

  @HasMany(() => Event)
  event: Event[];
}
