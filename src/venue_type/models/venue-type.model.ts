import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Venue } from "../../venue/models/venue.model";
import { VenueVenueType } from "../../venue_venue_type/models/venue_venue_type.model";

interface IVenueType {
  name: string;
}

@Table({ tableName: "venue_type" })
export class VenueType extends Model<VenueType, IVenueType> {
  @ApiProperty({
    example: 1,
    description: "Joy turining unikal identifikatsion raqami(autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ApiProperty({
    example: "Bunyodkor",
    description: "Joy turining nomi",
  })
  @Column({ type: DataType.STRING(100) })
  name: string;

  @BelongsToMany(() => Venue, () => VenueVenueType)
  venues: Venue[];
}
