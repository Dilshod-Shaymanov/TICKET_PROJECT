import { Module } from "@nestjs/common";
import { VenueController } from "./venue.controller";
import { VenueService } from "./venue.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Venue } from "./models/venue.model";

@Module({
  imports: [SequelizeModule.forFeature([Venue])],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
