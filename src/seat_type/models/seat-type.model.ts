import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISeatType {
  name: string;
}

@Table({ tableName: "seat_type" })
export class SeatType extends Model<SeatType, ISeatType> {
  @ApiProperty({
    example: 1,
    description: "Joy turining unikal identifikatsion raqami(autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "Balkon",
    description: "O'rindiq turi nomi",
  })
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;
}
