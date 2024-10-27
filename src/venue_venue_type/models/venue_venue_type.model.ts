import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Venue } from "../../venue/models/venue.model";
import { VenueType } from "../../venue_type/models/venue-type.model";

interface IVenueVenueTypeCreationAttr {
  venueId: number;
  venue_typeId: number;
}

@Table({ tableName: "venue_venue_type", timestamps: false })
export class VenueVenueType extends Model<
  VenueVenueType,
  IVenueVenueTypeCreationAttr
> {
  @ApiProperty({
    description: "Venue unikal identifikatori",
    example: 1,
  })
  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER })
  venueId: number;

  @BelongsTo(() => Venue)
  venue: Venue;
  @ApiProperty({
    description: "Venue turi unikal identifikatori",
    example: 2,
  })
  @ForeignKey(() => VenueType)
  @Column({ type: DataType.INTEGER })
  venue_typeId: number;

  @BelongsTo(() => VenueType)
  venue_type: VenueType;
}
