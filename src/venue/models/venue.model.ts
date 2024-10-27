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
import { District } from "../../district/models/district.model";
import { Event } from "../../event/models/event.model";
import { Region } from "../../region/models/region.model";
import { Seat } from "../../seat/models/seat.model";
import { VenuePhoto } from "../../venue_photo/models/veneu_photo.model";
import { VenueType } from "../../venue_type/models/venue-type.model";
import { VenueVenueType } from "../../venue_venue_type/models/venue_venue_type.model";

interface IVenueCreationAttr {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  regionId: number;
}

@Table({ tableName: "venue", timestamps: false })
export class Venue extends Model<Venue, IVenueCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unikal venue id (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: "Yoshlar ijod saroyi",
    description: "Venue nomi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: "Chilonzor",
    description: "Venue manzili",
  })
  @Column({ type: DataType.STRING })
  address: string;

  @ApiProperty({
    example: "Shaxar markazi",
    description: "Venue joylashuvi",
  })
  @Column({ type: DataType.STRING })
  location: string;

  @ApiProperty({
    example: "www.grandhall.com",
    description: "Venue veb-sayti",
  })
  @Column({ type: DataType.STRING })
  site: string;

  @ApiProperty({
    example: "+998 93 163 22 21",
    description: "Venue telefon raqami",
  })
  @Column({ type: DataType.STRING, unique: true })
  phone: string;

  @ApiProperty({
    example: ["Main Hall", "Conference Room"],
    description: "Venue sxemasi",
  })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  schema: string[];

  @HasMany(() => VenuePhoto)
  veneu_photos: VenuePhoto[];

  @ApiProperty({
    example: 1,
    description: "Region id",
  })
  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Seat)
  seat: Seat[];

  @ApiProperty({
    example: 1,
    description: "District id",
  })
  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER })
  districtId: number;

  @BelongsTo(() => District)
  district: District;

  @HasMany(() => Event)
  event: Event[];

  @BelongsToMany(() => VenueType, () => VenueVenueType)
  venue_types: VenueType[];
}
