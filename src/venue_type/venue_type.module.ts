import { Module } from "@nestjs/common";
import { VenueTypeController } from "./venue_type.controller";
import { VenueTypeService } from "./venue_type.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { VenueType } from "./models/venue-type.model";

@Module({
  imports: [SequelizeModule.forFeature([VenueType])],
  controllers: [VenueTypeController],
  providers: [VenueTypeService],
})
export class VenueTypeModule {}
