import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Venue } from "../../venue/models/venue.model";

interface IVenuePhoto {
  url: string;
}

@Table({ tableName: "venue_photo", timestamps: false })
export class VenuePhoto extends Model<VenuePhoto, IVenuePhoto> {
  @ApiProperty({
    example: 1,
    description: "Obyekt suratining unikal identifikatori (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "https://example.com/photo.jpg",
    description: "Obyekt suratining URL manzili",
  })
  @Column({ type: DataType.STRING })
  url: string;

  @ApiProperty({
    example: 1,
    description: "Obyekt suratining bog'lanishi (venue) uchun identifikator",
  })
  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER })
  venueId: number;

  @BelongsTo(() => Venue)
  venue: Venue;
}
